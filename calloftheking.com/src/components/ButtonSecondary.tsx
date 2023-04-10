import { ButtonHTMLAttributes } from 'react'
import _ from 'clsx'

function ButtonSecondary({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={_('text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 rounded-lg text-sm p-2.5', {
        [className ?? '']: !!className,
      })}
      {...props}
    />
  )
}

export default ButtonSecondary
