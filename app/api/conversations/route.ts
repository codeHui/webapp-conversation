import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRequestContext, setSession, withApiErrorHandling } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  return withApiErrorHandling(async () => {
    const { client, sessionId, user } = await getRequestContext(request)
    const { data }: any = await client.getConversations(user)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  })
}
