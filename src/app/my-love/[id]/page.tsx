import { notFound } from "next/navigation"
import { PetMemorialPage } from "@/components/pet-memorial-page"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

interface PetMemorialProps {
  params: {
    id: string
  }
}

export const dynamic = 'force-dynamic'; 

export default async function PetMemorial({ params }: PetMemorialProps) {
  try {
    // 使用 createServerComponentClient 获取用户会话
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    
    // 获取当前用户 - 使用 getSession 而不是 getUser
    const { data: { session } } = await supabase.auth.getSession()
    const user = session?.user
    
    if (!user) {
      notFound()
    }

    // 获取宠物信息并验证用户权限
    const { data: pet, error } = await supabase
      .from("pets")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single()
    
    if (error || !pet) {
      notFound()
    }

    return <PetMemorialPage pet={pet} />
  } catch (error) {
    console.error("Error loading pet memorial:", error)
    notFound()
  }
}