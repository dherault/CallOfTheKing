import { useCallback, useState } from 'react'

function useInputAutoSelect() {
  const [inputSelected, setInputSelected] = useState(false)

  const handleInputRef = useCallback((node: HTMLInputElement | null) => {
    if (!node || inputSelected) return

    node.select()
    node.onblur = () => setInputSelected(false)
    setInputSelected(true)
  }, [inputSelected])

  return handleInputRef
}

export default useInputAutoSelect
