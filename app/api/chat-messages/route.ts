import type { NextRequest } from 'next/server'
import { getRequestContext, setSession, withApiErrorHandling } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  return withApiErrorHandling(async () => {
    const { client, sessionId, user } = await getRequestContext(request)
    const body = await request.json()
    const {
      inputs,
      query,
      files,
      conversation_id: conversationId,
      response_mode: responseMode,
    } = body
    const res = await client.createChatMessage(inputs, query, user, responseMode, conversationId, files)
    return new Response(res.data as any, {
      headers: setSession(sessionId),
    })
  })
}
