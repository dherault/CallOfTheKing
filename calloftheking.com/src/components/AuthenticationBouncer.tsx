import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ViewerContext from '~contexts/ViewerContext'

import CenteredSpinner from './CenteredSpinner'

type AuthenticationBouncerPropsType = {
  children: ReactNode
}

function AuthenticationBouncer({ children }: AuthenticationBouncerPropsType) {
  const { user, loadingViewer } = useContext(ViewerContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (user || loadingViewer) return

    navigate('/authentication/signin')
  }, [user, loadingViewer, navigate])

  if (loadingViewer || !user) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
