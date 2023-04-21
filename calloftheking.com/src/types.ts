export type CollectionsType = 'users'

type DatabaseResourceType<T> = T & {
  id: string
  createdAt: string
  updatedAt: string
}

export type UserType = DatabaseResourceType<{
  name: string
  email: string
  isAdministrator: boolean
}>

export type CardType = DatabaseResourceType<{
  name: string
  description: string
  imagePath: string
}>

export type QuestItemType = DatabaseResourceType<{
  audioRecordingText: string
}>

export type QuestType = DatabaseResourceType<{
  name: string
  description: string
  questItemIds: string[]
  rewardCardIds: string[]
}>
