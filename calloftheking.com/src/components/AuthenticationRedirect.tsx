import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ViewerContext from '~contexts/ViewerContext'

import CenteredSpinner from '~components/CenteredSpinner'

type AuthenticationRedirectPropsType = {
  children: ReactNode
}

function AuthenticationRedirect({ children }: AuthenticationRedirectPropsType) {
  const { user, loadingViewer } = useContext(ViewerContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return

    navigate('/todo', { replace: true })
  }, [user, navigate])

  if (loadingViewer || user) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationRedirect
