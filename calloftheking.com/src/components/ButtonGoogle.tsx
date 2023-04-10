import { ButtonHTMLAttributes, useCallback, useContext, useState } from 'react'
import { signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { logEvent } from 'firebase/analytics'

import { UserType } from '~types'

import { analytics, auth, db, googleProvider } from '~firebase'

import ViewerContext from '~contexts/ViewerContext'

import sendSignupEmail from '~emails/signup'

import Spinner from './Spinner'

function ButtonGoogle({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setViewer, setUser } = useContext(ViewerContext)

  const [loading, setLoading] = useState(false)

  const handleClick = useCallback(() => {
    setLoading(true)

    signInWithPopup(auth, googleProvider)
      .then(async result => {
        const { user } = result
        const docRef = doc(db, 'users', user.uid)

        const fetchResult = await getDoc(docRef)

        if (fetchResult.exists()) {
          logEvent(analytics, 'login', {
            method: 'Google',
          })

          const updatedUser: Partial<UserType> = {
            name: user.displayName ?? '',
            email: user.email ?? '',
            updatedAt: new Date().toISOString(),
          }

          await updateDoc(docRef, updatedUser)

          setViewer(user)
          setUser({ ...fetchResult.data() as UserType, ...updatedUser })
        }
        else {
          logEvent(analytics, 'sign_up', {
            method: 'Google',
          })

          const now = new Date().toISOString()
          const createdUser: UserType = {
            id: user.uid,
            name: user.displayName ?? '',
            email: user.email ?? '',
            createdAt: now,
            updatedAt: now,
          }

          await setDoc(docRef, createdUser)
          await sendSignupEmail(createdUser)

          setViewer(user)
          setUser(createdUser)
        }
      })
      .catch(error => {
        console.error(error.code)

        setLoading(false)
      })
  }, [setUser, setViewer])

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center justify-center"
      {...props}
    >
      {loading && (
        <Spinner className="w-6 h-6" />
      )}
      {!loading && (
        <img
          src="/images/google-logo.png"
          alt="google"
          className="w-6 h-6"
        />
      )}
      <div className="ml-3">
        {children}
      </div>
    </button>
  )
}

export default ButtonGoogle
