import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import LogRocket from 'logrocket'

import { UserType } from '~types'

import { auth, db, persistancePromise } from '~firebase'

import ViewerContext, { ViewerContextType } from '~contexts/ViewerContext'

type AuthenticationProviderPropsType = {
  children: ReactNode
}

function AuthenticationProvider({ children }: AuthenticationProviderPropsType) {
  const [viewer, setViewer] = useState<User | null>(null)
  const [user, setUser] = useState<UserType | null>(null)
  const [loadingViewer, setViewerLoading] = useState(true)

  console.log('loadingViewer', loadingViewer)
  const viewerContextValue = useMemo<ViewerContextType>(() => ({ viewer, user, loadingViewer, setViewer, setUser }), [viewer, user, loadingViewer])

  const handleAuthenticationStateChange = useCallback(async () => {
    await persistancePromise

    onAuthStateChanged(auth, async (viewer: User | null) => {
      if (viewer) {
        const result = await getDoc(doc(db, 'users', viewer.uid))
        const user = result.data() as UserType

        setUser(user)
        setViewer(viewer)

        if (user) {
          LogRocket.identify(user.id, {
            // name: user.email,
            email: user.email,

            // Add your own custom user variables here, ie:
            // subscriptionType: 'pro'
          })
        }
      }

      setViewerLoading(false)
    })
  }, [])

  useEffect(() => {
    handleAuthenticationStateChange()
  }, [handleAuthenticationStateChange])

  return (
    <ViewerContext.Provider value={viewerContextValue}>
      {children}
    </ViewerContext.Provider>
  )
}

export default AuthenticationProvider
