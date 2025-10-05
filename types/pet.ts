export interface Pet {
  id: string
  user_id: string
  name: string
  nickname?: string
  species: string
  gender: string
  date_of_passing?: string
  date_first_met?: string
  owner_name: string
  breed?: string
  color?: string
  weight?: string
  microchip_number?: string
  personality?: string
  favorite_activities?: string
  special_memories?: string
  message_to_pet?: string
  photo_urls: string[]
  is_public: boolean
  created_at: string
  updated_at: string
}

export interface PetFormData {
  name: string
  nickname?: string
  species: string
  gender: string
  dateOfPassing?: string
  dateFirstMet?: string
  ownerName: string
  breed?: string
  color?: string
  weight?: string
  microchipNumber?: string
  personality?: string
  favoriteActivities?: string
  specialMemories?: string
  messageToPet?: string
  photoUrls?: string[]
  isPublic?: boolean
}