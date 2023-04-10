import { ReactNode, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ViewerContext from '~contexts/ViewerContext'

import CenteredSpinner from './CenteredSpinner'

type AuthenticationBouncerPropsType = {
  children: ReactNode
}

function AuthenticationBouncer({ children }: AuthenticationBouncerPropsType) {
  const { viewer, loadingViewer } = useContext(ViewerContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (viewer || loadingViewer) return

    navigate('/authentication/login')
  }, [viewer, loadingViewer, navigate])

  if (loadingViewer || !viewer) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AuthenticationBouncer
