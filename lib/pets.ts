import { Pet, PetFormData } from "@/types/pet"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

export async function createPet(petData: PetFormData, supabase: ReturnType<typeof createClientComponentClient<Database>>): Promise<Pet> {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) throw new Error("User not authenticated")

  // 检查用户是否已有宠物
  const existingPets = await getUserPets(user.id, supabase)
  if (existingPets.length > 0) {
    throw new Error("Each user can only create one pet memorial")
  }

  const { data, error } = await supabase.from("pets").insert({
    user_id: user.id,
    name: petData.name,
    nickname: petData.nickname || null,
    species: petData.species,
    gender: petData.gender,
    date_of_passing: petData.dateOfPassing || null,
    date_first_met: petData.dateFirstMet || null,
    owner_name: petData.ownerName,
    breed: petData.breed || null,
    color: petData.color || null,
    weight: petData.weight || null,
    microchip_number: petData.microchipNumber || null,
    personality: petData.personality || null,
    favorite_activities: petData.favoriteActivities || null,
    special_memories: petData.specialMemories || null,
    message_to_pet: petData.messageToPet || null,
    photo_urls: petData.photoUrls || [],
    is_public: petData.isPublic ?? false,
  }).select()

  if (error) throw error
  return data[0]
}

export async function getUserPets(userId: string, supabase: ReturnType<typeof createClientComponentClient<Database>>): Promise<Pet[]> {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("获取用户宠物列表失败:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("获取用户宠物列表时出错:", error)
    return []
  }
}

export async function getPetById(petId: string, supabase: ReturnType<typeof createClientComponentClient<Database>>): Promise<Pet | null> {
  try {
    const { data, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", petId)
      .single()

    if (error) {
      console.error("获取宠物信息失败:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("获取宠物信息时出错:", error)
    return null
  }
}

export async function updatePet(id: string, petData: Partial<PetFormData>, supabase: ReturnType<typeof createClientComponentClient<Database>>) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  if (!user) throw new Error("User not authenticated")

  const updateData: Partial<Database['public']['Tables']['pets']['Update']> = {
    name: petData.name,
    nickname: petData.nickname,
    species: petData.species,
    gender: petData.gender,
    date_of_passing: petData.dateOfPassing,
    date_first_met: petData.dateFirstMet,
    owner_name: petData.ownerName,
    breed: petData.breed,
    color: petData.color,
    weight: petData.weight !== undefined ? Number(petData.weight) : undefined,
    microchip_number: petData.microchipNumber,
    personality: petData.personality,
    favorite_activities: petData.favoriteActivities,
    special_memories: petData.specialMemories,
    message_to_pet: petData.messageToPet,
    photo_urls: petData.photoUrls,
    is_public: petData.isPublic,
    updated_at: new Date().toISOString(),
  }

  // 移除 undefined 值
  Object.keys(updateData).forEach(key => {
    const typedKey = key as keyof typeof updateData
    if (updateData[typedKey] === undefined) {
      delete updateData[typedKey]
    }
  })

  const { data, error } = await supabase
    .from("pets")
    .update(updateData)
    .eq("id", id)
    .eq("user_id", user.id)
    .select()

  if (error) throw error
  return data[0]
}

export async function deletePet(petId: string, supabase: ReturnType<typeof createClientComponentClient<Database>>): Promise<boolean> {
  try {
    const { error } = await supabase
      .from("pets")
      .delete()
      .eq("id", petId)

    if (error) {
      console.error("删除宠物信息失败:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("删除宠物信息时出错:", error)
    return false
  }
}

// 图片上传到 Supabase Storage
export async function uploadPetImage(file: File, userId: string, supabase: ReturnType<typeof createClientComponentClient<Database>>): Promise<string | null> {
  try {
    const fileName = `${userId}/${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from("pet-photos")
      .upload(fileName, file)

    if (error) {
      console.error("图片上传失败:", error)
      return null
    }

    // 获取公开 URL
    const { data: { publicUrl } } = supabase.storage
      .from("pet-photos")
      .getPublicUrl(fileName)

    return publicUrl
  } catch (error) {
    console.error("图片上传时出错:", error)
    return null
  }
}