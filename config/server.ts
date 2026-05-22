import 'server-only'
import type { PublicAgentConfig, ServerAgentConfig } from '@/types/app'

const normalizeConfigValue = (value?: string) => value?.trim() || ''

const buildAgentId = (name: string, appId: string, index: number) => {
  const normalizedName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return normalizedName || appId || `agent-${index + 1}`
}

const parseAgentConfigs = (): ServerAgentConfig[] => {
  const rawAgentConfigs = process.env.NEXT_PUBLIC_AGENT_CONFIGS?.trim()

  if (rawAgentConfigs) {
    try {
      const parsedConfigs = JSON.parse(rawAgentConfigs)

      if (Array.isArray(parsedConfigs)) {
        return parsedConfigs
          .map((item, index) => {
            const name = normalizeConfigValue(item?.name) || `Agent ${index + 1}`
            const appId = normalizeConfigValue(item?.appId)
            const apiKey = normalizeConfigValue(item?.apiKey)

            return {
              id: normalizeConfigValue(item?.id) || buildAgentId(name, appId, index),
              name,
              appId,
              apiKey,
            }
          })
          .filter(item => item.appId && item.apiKey)
      }
    }
    catch (error) {
      console.error('Failed to parse NEXT_PUBLIC_AGENT_CONFIGS:', error)
    }
  }

  const singleAppId = normalizeConfigValue(process.env.NEXT_PUBLIC_APP_ID)
  const singleApiKey = normalizeConfigValue(process.env.NEXT_PUBLIC_APP_KEY)

  if (!singleAppId || !singleApiKey) { return [] }

  return [{
    id: buildAgentId('Agent 1', singleAppId, 0),
    name: 'Agent 1',
    appId: singleAppId,
    apiKey: singleApiKey,
  }]
}

export const SERVER_AGENT_CONFIGS = parseAgentConfigs()
export const DEFAULT_SERVER_AGENT = SERVER_AGENT_CONFIGS[0]
export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`.trim()

export const getPublicAgentConfigs = (agents: ServerAgentConfig[] = SERVER_AGENT_CONFIGS): PublicAgentConfig[] => {
  return agents.map(({ id, name, appId }) => ({ id, name, appId }))
}

export const getServerAgentByAppId = (appId?: string | null) => {
  if (!appId) { return undefined }

  return SERVER_AGENT_CONFIGS.find(agent => agent.appId === appId)
}
