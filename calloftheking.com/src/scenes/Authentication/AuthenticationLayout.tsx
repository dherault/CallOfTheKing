import { ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'

import AuthenticationRedirect from '~components/AuthenticationRedirect'

type LayoutPropsType = {
  children: ReactNode
}

function AuthenticationLayout({ children }: LayoutPropsType) {
  const [urlQuery] = useSearchParams()
  const passwordResetSuccess = urlQuery.get('password-reset')

  return (
    <AuthenticationRedirect>
      <div className="flex flex-col items-center justify-center px-2 py-8 h-screen bg-papaya">
        <div className="h-fit md:w-1/2 mx-auto flex flex-col items-center">
          <div className="flex items-center gap-4 mb-8 text-2xl font-semibold">
            <img
              className="w-12 h-12"
              src="/images/logo.png"
              alt="logo"
            />
            <span className="font-display text-4xl">
              Call of the King
            </span>
          </div>
          {passwordResetSuccess && (
            <div className="p-8 text-green-600 my-4 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700">
              Check your inbox for a password reset link!
            </div>
          )}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </AuthenticationRedirect>
  )
}

export default AuthenticationLayout
