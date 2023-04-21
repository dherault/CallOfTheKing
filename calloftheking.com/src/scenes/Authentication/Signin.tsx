import { FormEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { logEvent } from 'firebase/analytics'
import { validate as validateEmail } from 'email-validator'
import _ from 'clsx'

import { analytics, auth } from '~firebase'

import Button from '~components/Button'
import ButtonGoogle from '~components/ButtonGoogle'
import Divider from '~components/Divider'

const errorCodeToError = {
  default: 'An error occurred, please try again',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/user-disabled': 'This account has been disabled',
  'auth/user-not-found': 'This account does not exist, please sign up',
  'auth/wrong-password': 'Your password is incorrect',
}

function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [hasBlurredEmail, setHasBlurredEmail] = useState(false)
  const [hasBlurredPassword, setHasBlurredPassword] = useState(false)
  const [errorCode, setErrorCode] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const error = errorCodeToError[errorCode as keyof typeof errorCodeToError] ?? (errorCode ? errorCodeToError.default : null)

  const emailError = useMemo(() => {
    if (!email || !hasBlurredEmail || validateEmail(email)) return null

    return 'You must provide a valid email'
  }, [hasBlurredEmail, email])

  const passwordError = useMemo(() => {
    if (!password || !hasBlurredPassword || password.length >= 8) return null

    return 'Your password must be at least 8 characters'
  }, [hasBlurredPassword, password])

  const handleSignUp = useCallback((event: FormEvent) => {
    event.preventDefault()

    if (loading) return

    setErrorCode(null)

    if (!email || !password || emailError || passwordError) {
      return
    }

    setLoading(true)

    const normalizedEmail = email.trim().toLowerCase()

    signInWithEmailAndPassword(auth, normalizedEmail, password)
      .then(() => {
        logEvent(analytics, 'login', {
          method: 'email',
        })
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [
    loading,
    email,
    password,
    emailError,
    passwordError,
  ])

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Enter your workspace
      </h1>
      <ButtonGoogle>
        Sign in with Google
      </ButtonGoogle>
      <Divider>or</Divider>
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
            className={_('outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500', {
              'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': !!emailError,
            })}
            placeholder="name@company.com"
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{emailError ?? <>&nbsp;</>}</p>
        </div>
        <div>
          <label
            htmlFor="password"
            className={_('block mb-2 text-sm font-medium text-gray-900 dark:text-white', {
              'text-red-700 dark:text-red-500': !!passwordError,
            })}
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={event => setPassword(event.target.value)}
            onBlur={() => password && setHasBlurredPassword(true)}
            className={_('outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500', {
              'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': !!passwordError,
            })}
          />
          <div className="flex justify-between mt-1">
            <p className="text-sm text-red-600 dark:text-red-500">{passwordError ?? <>&nbsp;</>}</p>
            <Link
              to="/authentication/password-reset"
              className="text-xs text-primary-600 hover:underline dark:text-primary-500 flex-shrink-0"
            >
              Forgot password?
            </Link>
          </div>
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
        <div>
          <p className="mt-8 text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account yet?
            {' '}
            <Link
              to="/authentication/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default Signin
