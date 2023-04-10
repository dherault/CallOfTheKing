import { useCallback, useEffect, useState } from 'react'
import { Query, onSnapshot } from 'firebase/firestore'

import useThrottle from './useThrottle'

function useArrayQuery<T>(query: Query) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)

  // The first querysnapshot being always empty
  // we throttle loading to be certain we waited for the possible second fetch
  const throttledLoading = useThrottle(loading, 333)

  const fetch = useCallback(() => onSnapshot(query, querySnapshot => {
    const data: T[] = []

    querySnapshot.forEach(doc => {
      data.push(doc.data() as T)
    })

    setData(data)
    setLoading(false)
  }), [query])

  useEffect(fetch, [fetch])

  return { data, loading: throttledLoading }
}

export default useArrayQuery
