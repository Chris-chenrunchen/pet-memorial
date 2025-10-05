"use client"

import { Pet } from "@/types/pet"
import { PetHeroSection } from "@/components/pet-hero-section"
import { PetStorySection } from "@/components/pet-story-section"
import { PetMemorialSection } from "@/components/pet-memorial-section"
import { PetNavigation } from "@/components/pet-navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PetMemorialPageProps {
  pet: Pet
}

export function PetMemorialPage({ pet }: PetMemorialPageProps) {
  const [activeSection, setActiveSection] = useState("hero")
  const router = useRouter()

  const handleGoBack = () => {
    router.push('/my-love')
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* 返回按钮 - 固定在左上角 */}
      <div className="fixed top-4 left-4 z-50">
        <Button
          onClick={handleGoBack}
          variant="ghost"
          size="sm"
          className="bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-md border"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
           Back to My Pets
        </Button>
      </div>

      {/* 主要内容容器 */}
      <div className="relative">
        {/* 右侧导航栏 - 最靠边定位，完全不遮挡内容 */}
        <div className="fixed right-2 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
          <PetNavigation 
            activeSection={activeSection} 
            onSectionChange={setActiveSection}
            petName={pet.name}
          />
        </div>

        {/* 主要内容 - 居中布局，不受导航栏影响 */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <section id="hero" className="min-h-screen">
            <PetHeroSection pet={pet} />
          </section>

          {/* 过渡分割线 - Hero 到 Story */}
          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 via-primary/60 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background/90 backdrop-blur-sm px-8 py-3 rounded-full border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <p className="text-sm font-medium text-primary/80">✨ {pet.name}'s Journey Continues ✨</p>
              </div>
            </div>
          </div>

          {/* Life Story & Personality Section */}
          <section id="story" className="min-h-screen py-16">
            <PetStorySection pet={pet} />
          </section>

          {/* 过渡分割线 - Story 到 Memorial */}
          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/40 via-primary-600 to-transparent" />
            </div>
            <div className="relative flex justify-center">
              <div className="bg-background/90 backdrop-blur-sm px-8 py-3 rounded-full border border-primary/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <p className="text-sm font-medium text-primary/80">🕊️ Forever in Our Hearts 🕊️</p>
              </div>
            </div>
          </div>

          {/* Memorial & Interaction Section */}
          <section id="memorial" className="min-h-screen py-16">
            <PetMemorialSection pet={pet} />
          </section>
        </div>
      </div>
    </div>
  )
}