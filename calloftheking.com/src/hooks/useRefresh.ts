import { useEffect, useState } from 'react'

function useRefresh() {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(x => !x)
  }, [])

  return [refresh, setRefresh] as const
}

export default useRefresh
