import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getRequestContext, withApiErrorHandling } from '@/app/api/utils/common'

export async function POST(request: NextRequest, { params }: {
  params: Promise<{ messageId: string }>
}) {
  return withApiErrorHandling(async () => {
    const { client, user } = await getRequestContext(request)
    const body = await request.json()
    const {
      rating,
    } = body
    const { messageId } = await params
    const { data } = await client.messageFeedback(messageId, rating, user)
    return NextResponse.json(data)
  })
}
