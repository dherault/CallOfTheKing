import { ButtonHTMLAttributes } from 'react'
import _ from 'clsx'

import Spinner from './Spinner'

type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  full?: boolean
  large?: boolean
  small?: boolean
  noGradient?: boolean
}

function Button({ children, loading, full, large, small, className = '', disabled, ...props }: ButtonPropsType) {
  return (
    <button
      disabled={disabled || loading}
      type="button"
      className={_('flex-shrink-0 text-white bg-primary-500 hover:bg-primary-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-800 flex items-center justify-center bg-right-top hover:bg-left-top transition-all duration-500', {
        'w-full': full,
        'px-6 py-3.5 text-base': large,
        'px-4 py-2 text-xs': small,
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

export default Button
