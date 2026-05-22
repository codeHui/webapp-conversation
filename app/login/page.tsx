import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import LoginForm from '@/app/components/login-form'
import { AUTH_COOKIE_NAME } from '@/config'
import { verifyAuthToken } from '@/utils/auth'

const LoginPage = async () => {
  const authToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value

  if (authToken) {
    try {
      await verifyAuthToken(authToken)
      redirect('/')
    }
    catch {
    }
  }

  return <LoginForm />
}

export default LoginPage
