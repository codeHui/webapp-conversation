import 'server-only'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { NextRequest } from 'next/server'
import { SignJWT, jwtVerify } from 'jose'
import type { AppSession, AuthenticatedUser, PublicAgentConfig } from '@/types/app'
import { AUTH_COOKIE_NAME } from '@/config'
import { getPublicAgentConfigs, SERVER_AGENT_CONFIGS } from '@/config/server'

interface RbacRoleConfig {
  agents?: string[]
}

interface RbacUserConfig {
  username: string
  role: string
}

interface RbacConfig {
  defaultPassword: string
  roles: Record<string, RbacRoleConfig>
  users: RbacUserConfig[]
}

const RBAC_CONFIG_PATH = path.join(process.cwd(), 'rbac.json')
const JWT_EXPIRES_IN = '12h'

const normalize = (value?: string | null) => value?.trim() || ''

const getJwtSecret = () => {
  return new TextEncoder().encode(normalize(process.env.JWT_SECRET) || 'change-me-in-production')
}

const loadRbacConfig = async (): Promise<RbacConfig> => {
  const rawConfig = await readFile(RBAC_CONFIG_PATH, 'utf8')
  const parsedConfig = JSON.parse(rawConfig) as Partial<RbacConfig>

  return {
    defaultPassword: normalize(parsedConfig.defaultPassword),
    roles: parsedConfig.roles || {},
    users: Array.isArray(parsedConfig.users)
      ? parsedConfig.users
        .map(user => ({
          username: normalize(user?.username),
          role: normalize(user?.role),
        }))
        .filter(user => user.username && user.role)
      : [],
  }
}

const findUserConfig = (config: RbacConfig, username: string) => {
  const normalizedUsername = normalize(username)
  return config.users.find(user => user.username === normalizedUsername)
}

const resolveAllowedAgents = (agentReferences: string[] = []): PublicAgentConfig[] => {
  const normalizedReferences = agentReferences.map(reference => normalize(reference).toLowerCase()).filter(Boolean)

  return getPublicAgentConfigs(
    SERVER_AGENT_CONFIGS.filter((agent) => {
      return normalizedReferences.includes(agent.id.toLowerCase())
        || normalizedReferences.includes(agent.appId.toLowerCase())
        || normalizedReferences.includes(agent.name.toLowerCase())
    }),
  )
}

const buildAuthenticatedUser = (config: RbacConfig, username: string): AuthenticatedUser => {
  const userConfig = findUserConfig(config, username)

  if (!userConfig) {
    throw new AuthError(401, 'Account does not exist.', 'auth_user_not_found')
  }

  const roleConfig = config.roles[userConfig.role]

  if (!roleConfig) {
    throw new AuthError(500, `Role "${userConfig.role}" is not configured.`, 'rbac_role_missing')
  }

  const agents = resolveAllowedAgents(roleConfig.agents)

  if (!agents.length) {
    throw new AuthError(403, 'No agents are assigned to this account.', 'rbac_no_agents')
  }

  return {
    username: userConfig.username,
    role: userConfig.role,
    agents,
  }
}

export class AuthError extends Error {
  status: number
  code: string

  constructor(status: number, message: string, code: string) {
    super(message)
    this.name = 'AuthError'
    this.status = status
    this.code = code
  }
}

export const createAuthToken = async (username: string) => {
  return new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(normalize(username))
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRES_IN)
    .sign(getJwtSecret())
}

export const authenticateUser = async (username: string, password: string) => {
  const config = await loadRbacConfig()

  if (!config.defaultPassword) {
    throw new AuthError(500, 'RBAC default password is not configured.', 'rbac_password_missing')
  }

  if (normalize(password) !== config.defaultPassword) {
    throw new AuthError(401, 'Invalid username or password.', 'auth_invalid_credentials')
  }

  return buildAuthenticatedUser(config, username)
}

export const verifyAuthToken = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret())
    return buildAuthenticatedUser(await loadRbacConfig(), normalize(payload.sub))
  }
  catch {
    throw new AuthError(401, 'Authentication token is invalid or expired.', 'auth_invalid_token')
  }
}

export const getAuthTokenFromRequest = (request: NextRequest) => {
  const authorization = request.headers.get('authorization')

  if (authorization?.toLowerCase().startsWith('bearer ')) {
    return normalize(authorization.slice(7))
  }

  return normalize(request.cookies.get(AUTH_COOKIE_NAME)?.value)
}

export const requireAuthenticatedUser = async (request: NextRequest) => {
  const token = getAuthTokenFromRequest(request)

  if (!token) {
    throw new AuthError(401, 'Authentication is required.', 'auth_required')
  }

  return verifyAuthToken(token)
}

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 12,
})

export const serializeAppSession = (user: AuthenticatedUser): AppSession => {
  return {
    user: {
      username: user.username,
      role: user.role,
    },
    agents: user.agents,
  }
}
