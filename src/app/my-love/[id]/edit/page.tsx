"use client"

import { useState, useEffect } from "react"
import { notFound, useRouter } from "next/navigation"
import { PetForm } from "@/components/pet-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Pet, PetFormData } from "@/types/pet"
import { getPetById, updatePet } from "@/lib/pets"
import { useAuth } from "@/components/auth-provider"
import { ProtectedRoute } from "@/components/protected-route"

interface EditPetPageProps {
  params: {
    id: string
  }
}

export default function EditPetPage({ params }: EditPetPageProps) {
  const { user, loading: authLoading, supabase } = useAuth()
  const router = useRouter()
  const [pet, setPet] = useState<Pet | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!authLoading && user) {
      loadPet()
    }
  }, [user, authLoading])

  const loadPet = async () => {
    try {
      const petData = await getPetById(params.id, supabase)
      if (!petData) {
        notFound()
      }
      
      // 验证用户权限
      if (petData.user_id !== user?.id) {
        notFound()
      }
      
      setPet(petData)
    } catch (error) {
      console.error("Failed to load pet:", error)
      notFound()
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (formData: PetFormData) => {
    if (!pet) return

    setSaving(true)
    try {
      const updatedPet = await updatePet(pet.id, formData, supabase)
      if (updatedPet) {
        router.push(`/my-love/${pet.id}`)
        router.refresh()
      }
    } catch (error) {
      console.error("Failed to update pet:", error)
      alert("Failed to update pet memorial. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    router.push(`/my-love/${params.id}`)
  }

  if (authLoading || loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading pet information...</p>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  if (!pet) {
    return notFound()
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={handleCancel}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Memorial
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-foreground mb-2">
              Edit {pet.name}'s Memorial
            </h1>
            <p className="text-muted-foreground">
              Update your beloved pet's memorial information
            </p>
          </div>

          <PetForm
            initialData={{
              name: pet.name,
              nickname: pet.nickname,
              species: pet.species,
              gender: pet.gender,
              dateFirstMet: pet.date_first_met,
              ownerName: pet.owner_name,
              breed: pet.breed,
              color: pet.color,
              weight: pet.weight,
              microchipNumber: pet.microchip_number,
              personality: pet.personality,
              favoriteActivities: pet.favorite_activities,
              specialMemories: pet.special_memories,
              messageToPet: pet.message_to_pet,
              photoUrls: pet.photo_urls
            }}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Save Changes"
            isLoading={saving}
          />
        </div>
      </div>
    </ProtectedRoute>
  )
}