'use client'
import type { FC } from 'react'
import React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CpuChipIcon,
} from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import type { AgentConfig } from '@/types/app'

export interface IAgentPanelProps {
  agents: AgentConfig[]
  currentAgentAppId: string
  collapsed: boolean
  onToggleCollapsed: () => void
  onSelectAgent: (appId: string) => void
}

const getAgentInitials = (name: string) => {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() || '')
    .join('') || 'AI'
}

const AgentPanel: FC<IAgentPanelProps> = ({
  agents,
  currentAgentAppId,
  collapsed,
  onToggleCollapsed,
  onSelectAgent,
}) => {
  const { t } = useTranslation()

  return (
    <div
      className={[
        'shrink-0 flex flex-col overflow-hidden border-r border-gray-200 bg-white text-gray-700 transition-all duration-200',
        collapsed ? 'w-[72px]' : 'w-[224px]',
        'tablet:h-[calc(100vh_-_3rem)] mobile:h-screen',
      ].join(' ')}
    >
      <div className='flex h-12 items-center justify-between border-b border-gray-100 bg-gray-50/80 px-3'>
        {!collapsed && (
          <div className='flex items-center gap-2 overflow-hidden'>
            <div className='flex h-8 w-8 items-center justify-center rounded-xl bg-primary-50 text-primary-600'>
              <CpuChipIcon className='h-4 w-4' />
            </div>
            <div className='truncate text-sm font-semibold text-gray-900'>{t('app.chat.agents')}</div>
          </div>
        )}
        <button
          type='button'
          title={collapsed ? t('app.chat.showAgents') : t('app.chat.hideAgents')}
          onClick={onToggleCollapsed}
          className='flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
        >
          {collapsed ? <ChevronRightIcon className='h-4 w-4' /> : <ChevronLeftIcon className='h-4 w-4' />}
        </button>
      </div>

      <div className='flex-1 space-y-1.5 overflow-y-auto bg-white px-2 py-3'>
        {agents.map((agent) => {
          const isCurrent = agent.appId === currentAgentAppId

          return (
            <button
              type='button'
              key={agent.appId}
              title={agent.name}
              onClick={() => onSelectAgent(agent.appId)}
              className={[
                'group flex w-full items-center gap-3 rounded-xl border px-2.5 py-2.5 text-left transition',
                collapsed ? 'justify-center px-0' : '',
                isCurrent
                  ? 'border-primary-200 bg-primary-50 text-primary-700'
                  : 'border-transparent bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50 hover:text-gray-900',
              ].join(' ')}
            >
              <div
                className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-semibold tracking-[0.08em]',
                  isCurrent ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200',
                ].join(' ')}
              >
                {getAgentInitials(agent.name)}
              </div>

              {!collapsed && (
                <div className='min-w-0 flex-1'>
                  <div className='truncate text-sm font-medium'>{agent.name}</div>
                </div>
              )}

              {!collapsed && (
                <div className={[
                  'h-2 w-2 shrink-0 rounded-full',
                  isCurrent ? 'bg-primary-500' : 'bg-transparent',
                ].join(' ')} />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(AgentPanel)
