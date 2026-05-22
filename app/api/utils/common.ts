import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ChatClient } from 'dify-client'
import { v4 } from 'uuid'
import type { ServerAgentConfig } from '@/types/app'
import { AGENT_ID_HEADER_NAME, APP_INFO, SESSION_COOKIE_NAME } from '@/config'
import { API_URL, getServerAgentByAppId } from '@/config/server'
import { AuthError, requireAuthenticatedUser } from '@/utils/auth'

const createChatClient = (apiKey: string) => new ChatClient(apiKey, API_URL || undefined)
const clientMap = new Map<string, ReturnType<typeof createChatClient>>()

const getChatClient = (agentConfig: ServerAgentConfig) => {
  const cachedClient = clientMap.get(agentConfig.appId)

  if (cachedClient) { return cachedClient }

  const nextClient = createChatClient(agentConfig.apiKey)
  clientMap.set(agentConfig.appId, nextClient)
  return nextClient
}

const getAuthorizedAgentConfig = async (request: NextRequest) => {
  const authenticatedUser = await requireAuthenticatedUser(request)
  const requestedAppId = request.headers.get(AGENT_ID_HEADER_NAME)
  const fallbackAgent = authenticatedUser.agents[0]
  const selectedAgent = authenticatedUser.agents.find(agent => agent.appId === requestedAppId) || fallbackAgent

  if (!selectedAgent) {
    throw new AuthError(403, 'No agents are assigned to this account.', 'rbac_no_agents')
  }

  if (requestedAppId && selectedAgent.appId !== requestedAppId) {
    throw new AuthError(403, 'You do not have permission to access this agent.', 'rbac_agent_forbidden')
  }

  const agentConfig = getServerAgentByAppId(selectedAgent.appId)

  if (!agentConfig) {
    throw new AuthError(500, 'Selected agent configuration is missing.', 'agent_config_missing')
  }

  return {
    authenticatedUser,
    agentConfig,
  }
}

export const getRequestContext = async (request: NextRequest) => {
  const { authenticatedUser, agentConfig } = await getAuthorizedAgentConfig(request)
  const sessionId = request.cookies.get(SESSION_COOKIE_NAME)?.value || v4()
  const user = `user_${authenticatedUser.username}_${agentConfig.appId}:${sessionId}`

  return {
    authenticatedUser,
    agentConfig,
    client: getChatClient(agentConfig),
    sessionId,
    user,
  }
}

export const setSession = (sessionId: string) => {
  if (APP_INFO.disable_session_same_site) { return { 'Set-Cookie': `${SESSION_COOKIE_NAME}=${sessionId}; SameSite=None; Secure; Path=/` } }

  return { 'Set-Cookie': `${SESSION_COOKIE_NAME}=${sessionId}; Path=/` }
}

export const createErrorResponse = (error: unknown) => {
  if (error instanceof AuthError) {
    return NextResponse.json({
      message: error.message,
      code: error.code,
    }, { status: error.status })
  }

  const status = typeof error === 'object' && error && 'status' in error && typeof error.status === 'number'
    ? error.status
    : 500

  const message = typeof error === 'object' && error && 'message' in error && typeof error.message === 'string'
    ? error.message
    : 'Unexpected server error.'

  return NextResponse.json({
    message,
    code: 'server_error',
  }, { status })
}

export const withApiErrorHandling = async <T>(handler: () => Promise<T>) => {
  try {
    return await handler()
  }
  catch (error) {
    return createErrorResponse(error) as T
  }
}
