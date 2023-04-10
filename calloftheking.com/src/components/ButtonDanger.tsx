import { ButtonHTMLAttributes } from 'react'
import _ from 'clsx'

import Spinner from './Spinner'

type ButtonDangerPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  full?: boolean
  large?: boolean
}

function ButtonDanger({ children, loading, full, large, className = '', ...props }: ButtonDangerPropsType) {
  return (
    <button
      disabled={loading}
      type="button"
      className={_('text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800 flex items-center justify-center hover:bg-right-top transition-all duration-500', {
        'w-full': full,
        'px-6 py-3.5 text-base': large,
        [className]: !!className,
      })}
      {...props}
    >
      {loading && (
        <>
          <Spinner className="inline w-4 h-4 mr-3" />
          Loading...
        </>
      )}
      {!loading && children}
    </button>
  )
}

export default ButtonDanger
