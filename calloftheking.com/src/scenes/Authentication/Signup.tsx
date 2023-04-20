import { FormEvent, useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { logEvent } from 'firebase/analytics'
import { doc, setDoc } from 'firebase/firestore'
import { validate as validateEmail } from 'email-validator'
import _ from 'clsx'

import { UserType } from '~types'

import { analytics, auth, db } from '~firebase'

import Button from '~components/Button'
import ButtonGoogle from '~components/ButtonGoogle'
import Divider from '~components/Divider'

import sendSignupEmail from '~emails/signup'

const errorCodeToError = {
  default: 'An error occurred, please try again',
  terms: 'You must accept the Terms and Conditions',
  'auth/email-already-in-use': 'This email is already in use',
  'auth/invalid-email': 'You must provide a valid email',
  'auth/weak-password': 'Your password must be at least 8 characters',
}

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [hasBlurredEmail, setHasBlurredEmail] = useState(false)
  const [hasBlurredPassword, setHasBlurredPassword] = useState(false)
  const [hasBlurredPasswordConfirmation, setHasBlurredPasswordConfirmation] = useState(false)
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

  const passwordConfirmationError = useMemo(() => {
    if (!passwordConfirmation || !(hasBlurredPassword && hasBlurredPasswordConfirmation) || password === passwordConfirmation) return null

    return 'Passwords mismatch'
  }, [hasBlurredPassword, hasBlurredPasswordConfirmation, password, passwordConfirmation])

  const handleSignUp = useCallback((event: FormEvent) => {
    event.preventDefault()

    if (loading) return

    if (!termsAccepted) {
      setErrorCode('terms')

      return
    }

    setErrorCode(null)

    if (!email || !password || !passwordConfirmation || emailError || passwordError || passwordConfirmationError) {
      return
    }

    setLoading(true)

    const normalizedEmail = email.trim().toLowerCase()

    createUserWithEmailAndPassword(auth, normalizedEmail, password)
      .then(async userCredential => {
        const createdAt = new Date().toISOString()
        // Omiting isAdministrator as per firestore rules
        const user: Omit<UserType, 'isAdministrator'> = {
          id: userCredential.user.uid,
          name: 'TODO: user.name',
          email: normalizedEmail,
          createdAt,
          updatedAt: createdAt,
        }

        logEvent(analytics, 'sign_up', {
          method: 'email',
        })

        await setDoc(doc(db, 'users', user.id), user)
        await sendSignupEmail(user as UserType)
      })
      .catch(error => {
        setLoading(false)
        setErrorCode(error.code)
      })
  }, [
    loading,
    email,
    password,
    passwordConfirmation,
    termsAccepted,
    emailError,
    passwordError,
    passwordConfirmationError,
  ])

  return (
    <>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create an account
      </h1>
      <ButtonGoogle>
        Sign up with Google
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
            className={_('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500', {
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
            className={_('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500', {
              'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': !!passwordError,
            })}
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{passwordError ?? <>&nbsp;</>}</p>
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className={_('block mb-2 text-sm font-medium text-gray-900 dark:text-white', {
              'text-red-700 dark:text-red-500': !!passwordConfirmationError,
            })}
          >
            Confirm password
          </label>
          <input
            type="password"
            name="confirm-password"
            autoComplete="new-password"
            id="confirm-password"
            placeholder="••••••••"
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
            onBlur={() => passwordConfirmation && setHasBlurredPasswordConfirmation(true)}
            className={_('bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500', {
              'border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500': !!passwordConfirmationError,
            })}
          />
          <p className="mt-1 text-sm text-red-600 dark:text-red-500">{passwordConfirmationError ?? <>&nbsp;</>}</p>
        </div>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="terms"
              aria-describedby="terms"
              type="checkbox"
              checked={termsAccepted}
              onChange={event => setTermsAccepted(event.target.checked)}
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="terms"
              className="font-light text-gray-500 dark:text-gray-300"
            >
              I accept the
              {' '}
              <Link
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                to="/legal"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
        </div>
        <p className="text-sm text-red-600 dark:text-red-500">{error ?? <>&nbsp;</>}</p>
        <div>
          <Button
            full
            loading={loading}
            type="submit"
          >
            Sign up
          </Button>
        </div>
        <div>
          <p className="mt-8 text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?
            {' '}
            <Link
              to="/authentication/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}

export default Signup
