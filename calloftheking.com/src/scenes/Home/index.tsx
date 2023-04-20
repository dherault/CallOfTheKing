import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import NotFound from 'scenes/NotFound'

import { UserType } from '~types'

import ViewerContext from '~contexts/ViewerContext'

import useQuery from '~hooks/useQuery'

import CenteredSpinner from '~components/CenteredSpinner'

function Home() {
  const { user: viewerUser } = useContext(ViewerContext)
  const { userId = viewerUser?.id || null } = useParams()
  const { loading: loadingUser, data: user } = useQuery<UserType>('users', userId)

  const isViewer = viewerUser?.id === user?.id

  if (loadingUser) {
    return (
      <CenteredSpinner />
    )
  }

  if (!user) {
    return (
      <NotFound />
    )
  }

  return (
    <div>
      <h1 className="text-4xl text-display">
        {user.name}
      </h1>
    </div>
  )
}

export default Home
