import { useCallback, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { nanoid } from 'nanoid'

import { CardType } from '~types'

import { db, storage } from '~firebase'

import Modal from '~components/Modal'
import Button from '~components/Button'
import ImageDrop from '~components/ImageDrop'

type CreateCardModalPropsType = {
  open: boolean
  onClose: () => void
}

function CreateCardModal({ open, onClose }: CreateCardModalPropsType) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleCreateCard = useCallback(async () => {
    if (!(name && description && imageFile)) return

    const id = nanoid()
    const imageRef = ref(storage, `cards/${id}`)

    const imageSnapshot = await uploadBytes(imageRef, imageFile)

    const createdAt = new Date().toISOString()
    const card: CardType = {
      id,
      name,
      description,
      imagePath: imageSnapshot.metadata.fullPath,
      createdAt,
      updatedAt: createdAt,
    }

    await setDoc(doc(db, 'cards', id), card)

    onClose()
  }, [name, description, imageFile, onClose])

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
          file={imageFile}
          setFile={setImageFile}
        />
        <Button onClick={handleCreateCard}>
          Create
        </Button>
      </div>
    </Modal>
  )
}

export default CreateCardModal
