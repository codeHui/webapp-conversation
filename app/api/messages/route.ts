import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRequestContext, setSession, withApiErrorHandling } from '@/app/api/utils/common'

export async function GET(request: NextRequest) {
  return withApiErrorHandling(async () => {
    const { client, sessionId, user } = await getRequestContext(request)
    const { searchParams } = new URL(request.url)
    const conversationId = searchParams.get('conversation_id')
    const { data }: any = await client.getConversationMessages(user, conversationId as string)
    return NextResponse.json(data, {
      headers: setSession(sessionId),
    })
  })
}
