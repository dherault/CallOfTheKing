import { Dispatch, SetStateAction, createContext } from 'react'
import { User } from 'firebase/auth'

import { UserType } from '~types'

export type ViewerContextType = {
  viewer: User | null
  setViewer: Dispatch<SetStateAction<User | null>>
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType | null>>
  loadingViewer: boolean
}

export default createContext<ViewerContextType>({
  viewer: null,
  setViewer: () => {},
  user: null,
  setUser: () => {},
  loadingViewer: true,
})
