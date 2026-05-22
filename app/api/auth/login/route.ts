import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AUTH_COOKIE_NAME, SESSION_COOKIE_NAME } from '@/config'
import { createErrorResponse } from '@/app/api/utils/common'
import { authenticateUser, createAuthToken, getAuthCookieOptions, serializeAppSession } from '@/utils/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const authenticatedUser = await authenticateUser(body?.username, body?.password)
    const authToken = await createAuthToken(authenticatedUser.username)
    const response = NextResponse.json(serializeAppSession(authenticatedUser))

    response.cookies.set(AUTH_COOKIE_NAME, authToken, getAuthCookieOptions())
    response.cookies.set(SESSION_COOKIE_NAME, '', {
      path: '/',
      maxAge: 0,
    })

    return response
  }
  catch (error) {
    return createErrorResponse(error)
  }
}
