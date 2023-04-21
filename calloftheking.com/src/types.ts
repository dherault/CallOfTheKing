export type CollectionsType = 'users'

export type UserType = {
  id: string
  name: string
  email: string
  isAdministrator: boolean
  createdAt: string
  updatedAt: string
}

export type CardType = {
  id: string
  name: string
  description: string
  imageUrl: string
}

export type QuestItemType = {
  id: string
  audioRecordingText: string
}

export type QuestType = {
  id: string
  name: string
  description: string
  questItemIds: string[]
  rewardCardIds: string[]
}
