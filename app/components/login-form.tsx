'use client'
import '@/i18n/i18next-config'
import React, { useState } from 'react'
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline'
import { useTranslation } from 'react-i18next'
import AppIcon from '@/app/components/base/app-icon'
import Toast from '@/app/components/base/toast'

const LoginForm = () => {
  const { t } = useTranslation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('123456')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!username.trim() || !password.trim()) {
      Toast.notify({ type: 'error', message: t('app.auth.loginRequired') })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null)
        Toast.notify({
          type: 'error',
          message: errorPayload?.message || t('app.auth.loginFailed'),
        })
        return
      }

      globalThis.location.href = '/'
    }
    catch {
      Toast.notify({ type: 'error', message: t('app.auth.loginFailed') })
    }
    finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className='relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6 py-10 text-white'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.24),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.22),_transparent_34%),linear-gradient(135deg,_#020617,_#111827_52%,_#0f172a)]' />
      <div className='absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,_rgba(255,255,255,0.08),_transparent)] blur-3xl' />

      <div className='relative grid w-full max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='flex flex-col justify-center rounded-[32px] border border-white/10 bg-white/6 p-8 shadow-2xl backdrop-blur xl:p-12'>
          <div className='mb-6 flex items-center gap-4'>
            <AppIcon size='large' className='!h-14 !w-14 rounded-2xl' />
            <div>
              <div className='text-sm uppercase tracking-[0.32em] text-emerald-200/80'>{t('app.auth.secureGateway')}</div>
              <h1 className='mt-2 text-4xl font-semibold tracking-tight text-white'>{t('app.auth.signInTitle')}</h1>
            </div>
          </div>

          <p className='max-w-xl text-base leading-7 text-slate-200'>{t('app.auth.signInDescription')}</p>

          <div className='mt-8 grid gap-4 sm:grid-cols-2'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-xs uppercase tracking-[0.28em] text-slate-400'>{t('app.auth.demoAccount')}</div>
              <div className='mt-3 text-2xl font-semibold text-white'>admin</div>
              <div className='mt-2 text-sm text-slate-300'>{t('app.auth.adminAccess')}</div>
            </div>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='text-xs uppercase tracking-[0.28em] text-slate-400'>{t('app.auth.demoAccount')}</div>
              <div className='mt-3 text-2xl font-semibold text-white'>user</div>
              <div className='mt-2 text-sm text-slate-300'>{t('app.auth.userAccess')}</div>
            </div>
          </div>
        </div>

        <div className='rounded-[32px] border border-white/10 bg-white p-8 text-slate-900 shadow-2xl xl:p-10'>
          <div className='mb-8'>
            <div className='text-sm font-medium uppercase tracking-[0.24em] text-emerald-600'>{t('app.auth.welcomeBack')}</div>
            <h2 className='mt-3 text-3xl font-semibold tracking-tight text-slate-950'>{t('app.auth.signIn')}</h2>
            <p className='mt-3 text-sm leading-6 text-slate-500'>{t('app.auth.passwordHint')}</p>
          </div>

          <form className='space-y-5' onSubmit={handleSubmit}>
            <label className='block'>
              <div className='mb-2 text-sm font-medium text-slate-700'>{t('app.auth.username')}</div>
              <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-500 focus-within:bg-white'>
                <UserIcon className='h-5 w-5 text-slate-400' />
                <input
                  value={username}
                  onChange={event => setUsername(event.target.value)}
                  className='w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400'
                  placeholder={t('app.auth.usernamePlaceholder')}
                  autoComplete='username'
                />
              </div>
            </label>

            <label className='block'>
              <div className='mb-2 text-sm font-medium text-slate-700'>{t('app.auth.password')}</div>
              <div className='flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 focus-within:border-emerald-500 focus-within:bg-white'>
                <LockClosedIcon className='h-5 w-5 text-slate-400' />
                <input
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  type='password'
                  className='w-full border-none bg-transparent text-sm outline-none placeholder:text-slate-400'
                  placeholder='123456'
                  autoComplete='current-password'
                />
              </div>
            </label>

            <button
              type='submit'
              disabled={isSubmitting}
              className='flex w-full items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400'
            >
              {isSubmitting ? t('app.auth.signingIn') : t('app.auth.signIn')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default React.memo(LoginForm)
