import { HTMLAttributes, MouseEvent, ReactNode, useCallback } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

import ButtonSecondary from '~components/ButtonSecondary'

type ModalPropsType = HTMLAttributes<HTMLDivElement> & {
  title: string
  open: boolean
  onClose: () => void
  children: ReactNode
}

function Modal({ title, open, onClose, children, ...props }: ModalPropsType) {
  const handleBackdropClick = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }, [onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 overflow-y-auto flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="w-fit max-h-full overflow-y-auto bg-white rounded-lg shadow-lg p-8 pt-6"
        {...props}
      >
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-bold">
            {title}
          </h2>
          <ButtonSecondary onClick={onClose}>
            <XMarkIcon width={20} />
          </ButtonSecondary>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
