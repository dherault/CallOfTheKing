import { useState } from 'react'

import Modal from '~components/Modal'
import ImageDrop from '~components/ImageDrop'

type CreateCardModalPropsType = {
  open: boolean
  onClose: () => void
}

function CreateCardModal({ open, onClose }: CreateCardModalPropsType) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create card"
      style={{ minWidth: 512 }}
    >
      <div className="flex flex-col gap-4">
        <input
          placeholder="Card name"
          value={name}
          onChange={event => setName(event.target.value)}
          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <textarea
          placeholder="Card description"
          value={description}
          onChange={event => setDescription(event.target.value)}
          className="outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        />
        <ImageDrop
          file={image}
          setFile={setImage}
        />
      </div>
    </Modal>
  )
}

export default CreateCardModal
