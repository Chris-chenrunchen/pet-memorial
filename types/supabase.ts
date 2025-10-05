export type Database = {
  public: {
    Tables: {
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          nickname: string | null
          species: string
          gender: string
          date_of_passing: string | null
          date_first_met: string | null
          owner_name: string
          breed: string | null
          color: string | null
          weight: number | null
          microchip_number: string | null
          personality: string | null
          favorite_activities: string | null
          special_memories: string | null
          message_to_pet: string | null
          photo_urls: string[]
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          nickname?: string | null
          species: string
          gender: string
          date_of_passing?: string | null
          date_first_met?: string | null
          owner_name: string
          breed?: string | null
          color?: string | null
          weight?: number | null
          microchip_number?: string | null
          personality?: string | null
          favorite_activities?: string | null
          special_memories?: string | null
          message_to_pet?: string | null
          photo_urls?: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          nickname?: string | null
          species?: string
          gender?: string
          date_of_passing?: string | null
          date_first_met?: string | null
          owner_name?: string
          breed?: string | null
          color?: string | null
          weight?: number | null
          microchip_number?: string | null
          personality?: string | null
          favorite_activities?: string | null
          special_memories?: string | null
          message_to_pet?: string | null
          photo_urls?: string[]
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}