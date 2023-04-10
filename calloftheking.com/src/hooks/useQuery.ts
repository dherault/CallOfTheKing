import { useCallback, useEffect, useState } from 'react'
import { DocumentReference, getDoc } from 'firebase/firestore'

function useQuery<T>(doc: DocumentReference) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    const docSnapshot = await getDoc(doc)

    if (docSnapshot.exists()) setData(docSnapshot.data() as T)

    setLoading(false)
  }, [doc])

  useEffect(() => {
    fetch()
  }, [fetch])

  return { data, loading }
}

export default useQuery
