import { ReactNode } from 'react'

type DividerPropsType = {
  children?: ReactNode
}

function Divider({ children }: DividerPropsType) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-10 border-b border-gray-300 dark:border-gray-700" />
      <span className="mx-2 text-sm text-gray-500 dark:text-gray-400">{children}</span>
      <div className="w-10 border-b border-gray-300 dark:border-gray-700" />
    </div>
  )
}

export default Divider
