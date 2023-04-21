import { useCallback, useState } from 'react'

import { CardType, QuestItemType, QuestType } from '~types'

import Button from '~components/Button'

function QuestDataUploader() {
  const [dataInput, setDataInput] = useState('')
  const [success, setSuccess] = useState(false)

  const processData = useCallback(async (data: any) => {
    const cards: CardType[] = []
    const questItems: QuestItemType[] = []
    const quests: QuestType[] = []

    Object.values(data.cards).forEach((cardTemplate: any) => {
      cards.push({
        id: cardTemplate.id,
        name: cardTemplate.name,
        description: cardTemplate.description,
      } as CardType)
    })

    Object.values(data.questItems).forEach((questItemTemplate: any) => {
      questItems.push({
        id: questItemTemplate.id,
        audioRecordingText: questItemTemplate.audioRecordingText,
      } as QuestItemType)
    })

    Object.values(data.quests).forEach((questTemplate: any) => {
      quests.push({
        id: questTemplate.id,

      } as QuestType)
    })
  }, [])

  const handleUpload = useCallback(async () => {
    try {
      await processData(JSON.parse(dataInput))
      setSuccess(true)
    }
    catch (error) {
      console.error(error)
    }
  }, [dataInput, processData])

  return (
    <div>
      <textarea
        className="w-full h-64 bg-slate-800"
        placeholder="Quest JSON input"
        value={dataInput}
        onChange={event => setDataInput(event.target.value)}
      />
      <Button onClick={handleUpload}>
        Upload
      </Button>
      {success && (
        <p>
          Success!
        </p>
      )}
    </div>
  )
}

export default QuestDataUploader
