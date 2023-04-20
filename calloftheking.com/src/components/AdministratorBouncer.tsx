import { ReactNode, useContext } from 'react'

import ViewerContext from '~contexts/ViewerContext'

import CenteredSpinner from '~components/CenteredSpinner'

type AdministratorBouncerPropsType = {
  children: ReactNode
}

function AdministratorBouncer({ children }: AdministratorBouncerPropsType) {
  const { user, loadingViewer } = useContext(ViewerContext)

  if (loadingViewer || !user || !user.isAdministrator) {
    return (
      <CenteredSpinner />
    )
  }

  return children as JSX.Element
}

export default AdministratorBouncer
