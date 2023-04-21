import { useCallback, useMemo, useState } from 'react'
import { collection, query } from 'firebase/firestore'

import { CardType } from '~types'

import { db } from '~firebase'

import useArrayLiveQuery from '~hooks/useArrayLiveQuery'

import Button from '~components/Button'
import Spinner from '~components/Spinner'
import DataGrid from '~components/DataGrid'

import CreateCardModal from './CreateCardModal'

function CardsEditor() {
  const q = useMemo(() => query(collection(db, 'cards')), [])
  const { data: cards, loading: loadingCards } = useArrayLiveQuery<CardType>(q)

  const [isCreateCardModalOpen, setIsCreateCardModalOpen] = useState(false)

  const handleOpenModal = useCallback(() => {
    setIsCreateCardModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsCreateCardModalOpen(false)
  }, [])

  const actions = useMemo(() => ({
    View: () => {},
    Edit: () => {},
    Delete: () => {},
  }), [])

  if (loadingCards) {
    return (
      <Spinner />
    )
  }

  return (
    <div>
      <CreateCardModal
        open={isCreateCardModalOpen}
        onClose={handleCloseModal}
      />
      <div className="flex items-center gap-4">
        <h2 className="text-3xl">
          Cards management
        </h2>
        <div className="flex-grow" />
        <Button onClick={handleOpenModal}>
          Create card
        </Button>
      </div>
      <div className="mt-4">
        <DataGrid
          columns={['id', 'name', 'description', 'createdAt', 'updatedAt']}
          rows={cards}
          actions={actions}
        />
      </div>
    </div>
  )
}

export default CardsEditor
