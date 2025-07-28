import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST(request: NextRequest) {
  try {
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })

    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 })
    }

    // Use Payload's built-in forgot password functionality
    await payload.forgotPassword({
      collection: 'users',
      data: {
        email,
      },
    })

    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      {
        message: 'If an account with that email exists, we have sent a password reset link.',
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Forgot password error:', error)
    // Always return success for security (don't reveal if email exists)
    return NextResponse.json(
      {
        message: 'Error sending password reset email. Please check server logs.',
      },
      { status: 500 },
    )
  }
}
