"use client"

import { Pet } from "@/types/pet"
import { Card } from "@/components/ui/card"
import { Heart, Calendar, User, Weight, Palette } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import Image from "next/image"
import { useState, useEffect } from "react"

interface PetHeroSectionProps {
  pet: Pet
}

export function PetHeroSection({ pet }: PetHeroSectionProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [daysInHeaven, setDaysInHeaven] = useState(0)

  useEffect(() => {
    // 计算去世天数（这里假设使用created_at作为去世日期，实际应该添加date_of_passing字段）
    const passingDate = new Date(pet.created_at)
    const today = new Date()
    const days = differenceInDays(today, passingDate)
    setDaysInHeaven(days)

    // 图片轮播
    if (pet.photo_urls && pet.photo_urls.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % pet.photo_urls.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [pet.created_at, pet.photo_urls])

  const getSpeciesEmoji = (species: string) => {
    const emojiMap: { [key: string]: string } = {
      dog: "🐕",
      cat: "🐱",
      rabbit: "🐰",
      bird: "🐦",
      hamster: "🐹",
      guinea_pig: "🐹",
      fish: "🐠"
    }
    return emojiMap[species] || "🐾"
  }

  const getGenderColor = (gender: string) => {
    return gender === "male" ? "text-blue-500" : "text-pink-500"
  }

  const getGenderIcon = (gender: string) => {
    return gender === "male" ? "♂" : "♀"
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景装饰 - 匹配首页风格 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat shadow-2xl"
        style={{
          backgroundImage: `url('/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg')`,
          filter: 'brightness(0.9) contrast(1.1)'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 transform perspective-1000">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 左侧：图片轮播 */}
          <div className="relative transform hover:scale-105 transition-all duration-700 hover:shadow-2xl rounded-3xl">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-3xl">
              {pet.photo_urls && pet.photo_urls.length > 0 ? (
                <div className="relative w-full h-full">
                  <Image
                    src={pet.photo_urls[currentImageIndex]}
                    alt={`${pet.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-opacity duration-1000"
                    priority
                  />
                  
                  {/* 图片指示器 */}
                  {pet.photo_urls.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {pet.photo_urls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? "bg-white w-8" 
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                  <div className="text-8xl">{getSpeciesEmoji(pet.species)}</div>
                </div>
              )}
            </div>

            {/* 天堂天数卡片 */}
            <Card className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border-primary/20 transform hover:scale-110 transition-all duration-300 hover:shadow-3xl hover:-translate-y-1">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {daysInHeaven}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Days in Pet Heaven
                </div>
                <div className="text-xs text-muted-foreground/70 mt-1">
                  Running freely in paradise
                </div>
              </div>
            </Card>
          </div>

          {/* 右侧：基本信息 */}
          <div className="space-y-8 transform hover:scale-105 transition-all duration-700">
            {/* 标题区域 */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                <h1 className="text-5xl lg:text-6xl font-serif text-foreground drop-shadow-lg">
                  {pet.name}
                </h1>
                <div className={`text-3xl ${getGenderColor(pet.gender)} drop-shadow-md transform hover:scale-110 transition-transform duration-300`}>
                  {getGenderIcon(pet.gender)}
                </div>
              </div>
              
              {pet.nickname && (
                <p className="text-xl text-muted-foreground italic mb-2">
                  "{pet.nickname}"
                </p>
              )}
              
              <div className="flex items-center justify-center lg:justify-start gap-2 text-lg text-muted-foreground">
                <span>{getSpeciesEmoji(pet.species)}</span>
                <span className="capitalize">{pet.species}</span>
                {pet.breed && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{pet.breed}</span>
                  </>
                )}
              </div>
            </div>

            {/* 详细信息卡片 */}
            <Card className="p-6 bg-background/80 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* 出生日期 */}
                {pet.date_of_passing && (
                  <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Born</p>
                      <p className="font-semibold text-foreground">
                        {format(new Date(pet.date_of_passing), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}

                {/* 初次相遇日期 */}
                {pet.date_first_met && (
                  <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <Heart className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">First met</p>
                      <p className="font-semibold text-foreground">
                        {format(new Date(pet.date_first_met), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                )}

                {/* 体重 */}
                {pet.weight && (
                  <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <Weight className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Weight</p>
                      <p className="font-semibold text-foreground">{pet.weight}</p>
                    </div>
                  </div>
                )}

                {/* 颜色 */}
                {pet.color && (
                  <div className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                    <Palette className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Color</p>
                      <p className="font-semibold text-foreground capitalize">{pet.color}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 主人信息 */}
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Beloved by</p>
                    <p className="font-semibold text-lg text-foreground">{pet.owner_name}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 给宠物的留言 */}
            {pet.message_to_pet && (
              <Card className="p-6 bg-accent/50 border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-center">
                  <p className="text-sm font-medium text-primary mb-2">Message to {pet.name}</p>
                  <p className="text-lg text-foreground italic leading-relaxed">
                    "{pet.message_to_pet}"
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}