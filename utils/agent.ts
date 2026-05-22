import { SELECTED_AGENT_STORAGE_KEY } from '@/config'
import type { PublicAgentConfig } from '@/types/app'

export const getAgentByAppId = (agents: PublicAgentConfig[], appId?: string | null): PublicAgentConfig | undefined => {
  if (!appId) { return undefined }

  return agents.find(agent => agent.appId === appId)
}

export const getStoredSelectedAgentAppId = (agents: PublicAgentConfig[]) => {
  const fallbackAppId = agents[0]?.appId || ''

  if (typeof window === 'undefined') { return fallbackAppId }

  const storedAppId = getStoredSelectedAgentAppIdValue()
  return getAgentByAppId(agents, storedAppId)?.appId || fallbackAppId
}

export const getStoredSelectedAgentAppIdValue = () => {
  if (typeof window === 'undefined') { return '' }

  return globalThis.localStorage?.getItem(SELECTED_AGENT_STORAGE_KEY) || ''
}

export const setStoredSelectedAgentAppId = (appId: string, agents: PublicAgentConfig[]) => {
  if (typeof window === 'undefined') { return }

  if (!getAgentByAppId(agents, appId)) {
    globalThis.localStorage?.removeItem(SELECTED_AGENT_STORAGE_KEY)
    return
  }

  globalThis.localStorage?.setItem(SELECTED_AGENT_STORAGE_KEY, appId)
}

export const getSelectedAgent = (agents: PublicAgentConfig[], appId?: string | null) => {
  return getAgentByAppId(agents, appId) || agents[0]
}
