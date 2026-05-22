import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRequestContext, withApiErrorHandling } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
  params: Promise<{ conversationId: string }>
}) {
  return withApiErrorHandling(async () => {
    const { client, user } = await getRequestContext(request)
    const body = await request.json()
    const {
      auto_generate,
      name,
    } = body
    const { conversationId } = await params

    const { data } = await client.renameConversation(conversationId, name, user, auto_generate)
    return NextResponse.json(data)
  })
}
