"use client"

import { useState, useEffect } from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { PetForm } from "@/components/pet-form"
import { PetCard } from "@/components/pet-card"
import { Button } from "@/components/ui/button"
import { Plus, Heart, ArrowLeft } from "lucide-react"
import { useAuth } from "@/components/auth-provider"
import { Pet, PetFormData } from "@/types/pet"
import { createPet, getUserPets, deletePet } from "@/lib/pets"
import { useRouter } from "next/navigation"

export default function MyLovePage() {
  const { user, supabase } = useAuth()
  const [pets, setPets] = useState<Pet[]>([])
  const [showForm, setShowForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      loadUserPets()
    }
  }, [user])

  const handleEditPet = (pet: Pet) => {
    router.push(`/my-love/${pet.id}/edit`)
  }

  const handleDeletePet = async (petId: string) => {
    try {
      const success = await deletePet(petId, supabase)
      if (success) {
        // 从列表中移除已删除的宠物
        setPets(pets.filter(pet => pet.id !== petId))
      }
    } catch (error) {
      console.error('Failed to delete pet:', error)
      alert('Failed to delete pet memorial. Please try again.')
    }
  }

  const loadUserPets = async () => {
    if (!user) return
    
    setIsLoading(true)
    try {
      const userPets = await getUserPets(user.id, supabase)
      setPets(userPets)
    } catch (error) {
      console.error("加载宠物列表失败:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreatePet = async (petData: PetFormData) => {
    if (!user) return

    try {
      const newPet = await createPet(petData, supabase)
      if (newPet) {
        setPets(prev => [newPet, ...prev])
        setShowForm(false)
        // 显示成功消息
        alert("Pet memorial created successfully!")
      }
    } catch (error: any) {
      console.error("创建宠物失败:", error)
      if (error.message?.includes("Each user can only create one pet memorial now")) {
        alert("You can only create one pet memorial per account. You already have a pet memorial created.")
      } else {
        alert("Failed to create pet memorial. Please try again.")
      }
    }
  }

  if (showForm) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-6">
              <Button
                variant="ghost"
                onClick={() => setShowForm(false)}
                className="mb-4"
              >
                ← Back to My Pets
              </Button>
            </div>
            <PetForm
              onSubmit={handleCreatePet}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 返回官网按钮 */}
          <div className="mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Homepage
            </Button>
          </div>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-serif text-foreground">My Love</h1>
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <p className="text-lg text-muted-foreground">
              A special place to remember your beloved pets
            </p>
          </div>

          {/* 创建新纪念册按钮 */}
          <div className="flex justify-center mb-8 gap-4">
            {pets.length === 0 && (
              <Button
                onClick={() => setShowForm(true)}
                size="lg"
                className="gap-2"
              >
                <Plus className="h-5 w-5" />
                Create New Memorial
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              onClick={() => window.open('/my-love/demo', '_blank')}
            >
              <Heart className="h-5 w-5" />
              View Demo Memorial
            </Button>
          </div>

          {/* 宠物列表 */}
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading your pets...</p>
            </div>
          ) : pets.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-card rounded-lg p-8 border border-border max-w-md mx-auto">
                <div className="text-muted-foreground mb-4">
                  <Heart className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  No Memorials Yet
                </h3>
                <p className="text-muted-foreground mb-6">
                  Create a beautiful memorial for your beloved pet
                </p>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create First Memorial
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {/* 已有宠物时的提示信息 */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-amber-600" />
                  <div>
                    <h4 className="font-medium text-amber-800">One Memorial Per Account</h4>
                    <p className="text-sm text-amber-700">
                      You have already created a pet memorial. Each account can only have one memorial to keep the experience special and focused.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pets.map((pet) => (
                  <PetCard 
                    key={pet.id} 
                    pet={pet} 
                    onEdit={handleEditPet}
                    onDelete={handleDeletePet}
                  />
                ))}
              
              {/* 只在用户没有宠物时显示添加新纪念册卡片 */}
              {pets.length === 0 && (
                <div
                  onClick={() => setShowForm(true)}
                  className="bg-card rounded-lg p-6 text-center border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors group"
                >
                  <div className="text-muted-foreground mb-4 group-hover:text-primary transition-colors">
                    <Plus className="w-12 h-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Add Memorial
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Create a new memorial for your beloved pet
                  </p>
                </div>
              )}
            </div>
          </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}