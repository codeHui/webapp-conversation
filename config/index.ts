import type { AppInfo } from '@/types/app'

export const APP_INFO: AppInfo = {
  title: 'Chat APP',
  description: '',
  copyright: '',
  privacy_policy: '',
  default_language: 'en',
  disable_session_same_site: false, // set it to true if you want to embed the chatbot in an iframe
}

export const isShowPrompt = false
export const promptTemplate = 'I want you to act as a javascript console.'

export const API_PREFIX = '/api'
export const AGENT_ID_HEADER_NAME = 'x-dify-app-id'
export const AUTH_COOKIE_NAME = 'auth_token'
export const SESSION_COOKIE_NAME = 'session_id'
export const SELECTED_AGENT_STORAGE_KEY = 'selectedAgentAppId'

export const LOCALE_COOKIE_NAME = 'locale'

export const DEFAULT_VALUE_MAX_LEN = 48
