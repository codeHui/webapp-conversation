import React from 'react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import Main from '@/app/components'
import { AUTH_COOKIE_NAME } from '@/config'
import { serializeAppSession, verifyAuthToken } from '@/utils/auth'

const App = async ({
  params,
}: any) => {
  const authToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value

  if (!authToken) {
    redirect('/login')
  }

  try {
    const authenticatedUser = await verifyAuthToken(authToken)

    return (
      <Main params={params} session={serializeAppSession(authenticatedUser)} />
    )
  }
  catch {
    redirect('/login')
  }
}

export default App
