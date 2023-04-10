import { FormEvent, useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { validate as validateEmail } from 'email-validator'
import _ from 'clsx'

import { auth } from '~firebase'

import Button from '~components/Button'

const errorCodeToError = {
  default: 'An error occurred, please try again',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
}

function PasswordReset() {
  const [email, setEmail] = useState('')
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [hasBlurredEmail, setHasBlurredEmail] = useState(false)
  const [loading, setLoading] = useState(false)
  const error = errorCodeToError[errorCode as keyof typeof errorCodeToError] ?? errorCode ? errorCodeToError.default : null

  const navigate = useNavigate()

  const emailError = useMemo(() => {
    if (!email || !hasBlurredEmail || validateEmail(email)) return null

    return 'You must provide a valid email'
  }, [hasBlurredEmail, email])

  const handleSignUp = useCallback((event: FormEvent) => {
    event.preventDefault()

    if (loading) return

    setErrorCode(null)

    if (!email) {
      return
    }

    setLoading(true)

    const normalizedEmail = email.trim().toLowerCase()

    sendPasswordResetEmail(auth, normalizedEmail)
      .then(() => {
        navigate('/authentication/login?password-reset=true')
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [
    loading,
    email,
    navigate,
  ])

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Receive a password reset email
      </h1>
      <form
        action=""
        className="space-y-2"
        onSubmit={handleSignUp}
      >
        <div>
          <label
            htmlFor="email"
            className={_('block mb-2 -mt-0.5 text-sm font-medium text-gray-900 dark:text-white', {
              'text-red-700 dark:text-red-500': !!emailError,
            })}
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            autoComplete="email"
            id="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            onBlur={() => email && setHasBlurredEmail(true)}
            className={_('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500', {
              'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': !!emailError,
            })}
            placeholder="name@company.com"
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{emailError ?? <>&nbsp;</>}</p>
        </div>
        <p className="text-sm text-red-600 dark:text-red-500">{error ?? <>&nbsp;</>}</p>
        <div>
          <Button
            full
            loading={loading}
            type="submit"
          >
            Log in
          </Button>
        </div>
      </form>
    </>
  )
}

export default PasswordReset
