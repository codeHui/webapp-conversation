import { NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/config'

export async function POST() {
  const response = NextResponse.json({ success: true })

  response.cookies.set(AUTH_COOKIE_NAME, '', {
    path: '/',
    maxAge: 0,
  })
  response.cookies.set(SESSION_COOKIE_NAME, '', {
    path: '/',
    maxAge: 0,
  })

  return response
}
