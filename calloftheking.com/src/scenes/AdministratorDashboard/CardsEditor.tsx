import { useCallback, useMemo, useState } from 'react'
import { collection, orderBy, query } from 'firebase/firestore'

import { CardType } from '~types'

import { db } from '~firebase'

import useArrayLiveQuery from '~hooks/useArrayLiveQuery'

import Button from '~components/Button'
import Spinner from '~components/Spinner'

import CreateCardModal from './CreateCardModal'

function CardsEditor() {
  const q = useMemo(() => query(collection(db, 'cards'), orderBy('updatedAt', 'desc')), [])
  const { data: cards, loading: loadingCards } = useArrayLiveQuery<CardType>(q)

  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsCreateCardModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsCreateCardModalOpen(false)
  }, [])

  if (loadingCards) {
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <h2 className="text-3xl">
          Cards management
        </h2>
        <div className="flex-grow" />
        <Button onClick={handleOpenModal}>
          Add card
        </Button>
      </div>
      <CreateCardModal
        open={isCreateCardModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default CardsEditor
