"use client"

import { Pet } from "@/types/pet"
import { Card } from "@/components/ui/card"
import { BookOpen, Heart, Star, Sparkles } from "lucide-react"

interface PetStorySectionProps {
  pet: Pet
}

export function PetStorySection({ pet }: PetStorySectionProps) {
  // 解析个性标签
  const getPersonalityTags = () => {
    if (!pet.personality) return []
    
    // 从个性描述中提取标签（这里简化处理，实际可以更复杂）
    const commonTraits = [
      "friendly", "playful", "loyal", "gentle", "brave", "smart", "curious",
      "affectionate", "energetic", "calm", "protective", "funny", "sweet",
      "independent", "social", "quiet", "active", "loving", "gentle", "fierce"
    ]
    
    const tags: string[] = []
    const personalityLower = pet.personality.toLowerCase()
    
    commonTraits.forEach(trait => {
      if (personalityLower.includes(trait)) {
        tags.push(trait.charAt(0).toUpperCase() + trait.slice(1))
      }
    })
    
    // 如果没有找到预设标签，从描述中创建一些标签
    if (tags.length === 0) {
      const words = pet.personality.split(/[\s,]+/).slice(0, 3)
      return words.map(word => word.replace(/[^\w]/g, '')).filter(word => word.length > 2)
    }
    
    return tags.slice(0, 6) // 最多显示6个标签
  }

  // 解析活动标签
  const getActivityTags = () => {
    if (!pet.favorite_activities) return []
    
    const activities = pet.favorite_activities.split(/[,，]/).map(activity => 
      activity.trim().replace(/^["']|["']$/g, '')
    ).filter(activity => activity.length > 0)
    
    return activities.slice(0, 4) // 最多显示4个活动
  }

  const personalityTags = getPersonalityTags()
  const activityTags = getActivityTags()

  const allTags = [
    ...personalityTags.map(tag => ({ text: tag, type: 'personality' as const })),
    ...activityTags.map(tag => ({ text: tag, type: 'activity' as const }))
  ]

  const getTagIcon = (type: string) => {
    switch (type) {
      case 'personality':
        return <Star className="h-4 w-4" />
      case 'activity':
        return <Heart className="h-4 w-4" />
      default:
        return <Sparkles className="h-4 w-4" />
    }
  }

  const getTagColor = (type: string) => {
    switch (type) {
      case 'personality':
        return "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200"
      case 'activity':
        return "bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200"
      default:
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 标题 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BookOpen className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-serif text-foreground">
            Life Story & Personality
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          The beautiful journey of {pet.name} and the wonderful memories we shared together
        </p>
      </div>

      <div className="space-y-12">
        {/* 生命故事 */}
        {(pet.special_memories || pet.favorite_activities) && (
          <Card className="p-8 bg-background/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Life Story</h3>
            </div>
            
            <div className="space-y-6">
              {pet.special_memories && (
                <div className="bg-accent/30 p-6 rounded-xl border border-border/30">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Special Memories
                  </h4>
                  <p className="text-foreground leading-relaxed text-lg">
                    {pet.special_memories}
                  </p>
                </div>
              )}
              
              {pet.favorite_activities && (
                <div className="bg-accent/30 p-6 rounded-xl border border-border/30">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    Favorite Activities
                  </h4>
                  <p className="text-foreground leading-relaxed text-lg">
                    {pet.favorite_activities}
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* 个性标签 */}
        {allTags.length > 0 && (
          <Card className="p-8 bg-background/80 backdrop-blur-sm border-border/50">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent rounded-lg">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground">Personality & Traits</h3>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all duration-300 hover:scale-105 bg-accent/50 text-foreground border-border/50 hover:bg-accent/70`}
                >
                  {getTagIcon(tag.type)}
                  <span className="font-medium">{tag.text}</span>
                </div>
              ))}
            </div>
            
            {pet.personality && (
              <div className="mt-6 p-4 bg-accent/30 rounded-lg border border-border/30">
                <p className="text-foreground leading-relaxed">
                  <strong>More about {pet.name}:</strong> {pet.personality}
                </p>
              </div>
            )}
          </Card>
        )}

        {/* 如果没有故事内容，显示温馨的提示 */}
        {!pet.special_memories && !pet.favorite_activities && !pet.personality && (
          <Card className="p-12 bg-background/80 backdrop-blur-sm text-center border-border/50">
            <div className="text-6xl mb-4">🌈</div>
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Every Life is a Beautiful Story
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {pet.name}'s story is waiting to be told. The memories we create with our beloved pets 
              are treasures that last forever in our hearts.
            </p>
          </Card>
        )}
      </div>
    </div>
  )
}