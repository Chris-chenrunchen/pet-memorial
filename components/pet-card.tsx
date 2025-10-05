"use client"

import { Pet } from "@/types/pet"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Calendar, Heart, User, Edit, Trash2, Globe, Lock } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PetCardProps {
  pet: Pet
  isDemo?: boolean
  isPublicView?: boolean
  onEdit?: (pet: Pet) => void
  onDelete?: (petId: string) => void
}

export function PetCard({ pet, isDemo = false, isPublicView = false, onEdit, onDelete }: PetCardProps) {
  const router = useRouter()

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onEdit) {
      onEdit(pet)
    }
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (onDelete && confirm(`Are you sure you want to delete ${pet.name}'s memorial? This action cannot be undone.`)) {
      onDelete(pet.id)
    }
  }
  const getSpeciesIcon = (species: string) => {
    switch (species) {
      case "dog": return "🐕"
      case "cat": return "🐱"
      case "rabbit": return "🐰"
      case "bird": return "🐦"
      case "hamster": return "🐹"
      case "guinea_pig": return "🐹"
      case "fish": return "🐠"
      default: return "🐾"
    }
  }

  const getGenderColor = (gender: string) => {
    switch (gender) {
      case "male": return "text-blue-500"
      case "female": return "text-pink-500"
      default: return "text-gray-500"
    }
  }

  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case "male": return "♂"
      case "female": return "♀"
      default: return "⚲"
    }
  }

  return (
    <Link href={isDemo ? `/my-love/demo` : `/my-love/${pet.id}`}>
      <Card className={`h-full hover:shadow-lg transition-all duration-300 cursor-pointer group ${isPublicView ? 'hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-card/90' : ''}`}>
        <div className="relative">
          {pet.photo_urls && pet.photo_urls.length > 0 ? (
            <div className="relative h-48 w-full">
              <Image
                src={pet.photo_urls[0]}
                alt={pet.name}
                fill
                className="object-cover rounded-t-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-lg" />
            </div>
          ) : (
            <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center rounded-t-lg">
              <div className="text-6xl">{getSpeciesIcon(pet.species)}</div>
            </div>
          )}
          
          <div className="absolute top-3 right-3">
            <div className={`text-xl ${getGenderColor(pet.gender)}`}>
              {getGenderIcon(pet.gender)}
            </div>
          </div>
        </div>

        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {pet.name}
            </h3>
            <div className="flex items-center gap-2">
              {pet.nickname && (
                <span className="text-sm text-muted-foreground italic">
                  "{pet.nickname}"
                </span>
              )}
              {pet.is_public ? (
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                  isPublicView 
                    ? 'bg-primary/10 text-primary border border-primary/20' 
                    : 'bg-green-100 text-green-700'
                }`}>
                  <Globe className="h-3 w-3" />
                  {isPublicView ? 'Memorial' : 'Public'}
                </div>
              ) : (
                <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                  <Lock className="h-3 w-3" />
                  Private
                </div>
              )}
            </div>
          </div>
          
          {pet.breed && (
            <p className="text-sm text-muted-foreground capitalize">
              {pet.breed}
            </p>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          <div className="space-y-2">
            {pet.date_of_passing && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Born: {format(new Date(pet.date_of_passing), "MMM d, yyyy")}</span>
              </div>
            )}
            
            {pet.date_first_met && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="h-4 w-4" />
                <span>First Met: {format(new Date(pet.date_first_met), "MMM d, yyyy")}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Beloved by {pet.owner_name}</span>
            </div>
          </div>

          {pet.personality && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {pet.personality}
              </p>
            </div>
          )}

          {/* 主人想说的话 */}
          {pet.message_to_pet && (
            <div className="bg-primary/5 p-3 rounded-lg">
              <p className="text-sm font-medium text-primary mb-1">Message to {pet.name}</p>
              <p className="text-sm text-foreground italic">"{pet.message_to_pet}"</p>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-2">
              {pet.photo_urls.slice(0, 3).map((url, index) => (
                <div key={index} className="w-8 h-8 rounded-full border-2 border-background overflow-hidden">
                  <Image
                    src={url}
                    alt={`${pet.name} photo ${index + 1}`}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
              ))}
              {pet.photo_urls.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                  +{pet.photo_urls.length - 3}
                </div>
              )}
            </div>
            
            <div className="text-sm text-muted-foreground">
              View Memorial →
            </div>
          </div>

          {/* 编辑和删除按钮 - 仅在非公共视图中显示 */}
          {!isDemo && !isPublicView && (onEdit || onDelete) && (
            <div className="mt-4 pt-4 border-t border-border flex gap-2">
              {onEdit && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleEdit}
                  className="flex-1 gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  className="flex-1 gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}