import type { NextRequest } from 'next/server'
import { getRequestContext, withApiErrorHandling } from '@/app/api/utils/common'

export async function POST(request: NextRequest) {
  return withApiErrorHandling(async () => {
    const { client, user } = await getRequestContext(request)
    const formData = await request.formData()
    formData.append('user', user)
    const res = await client.fileUpload(formData)
    return new Response(res.data.id as any)
  })
}
