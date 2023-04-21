import { useState } from 'react'

import Modal from '~components/Modal'

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
    >
      Foo
    </Modal>
  )
}

export default CreateCardModal
