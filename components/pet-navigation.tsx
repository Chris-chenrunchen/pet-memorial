"use client"

import { Heart, BookOpen, MessageCircle, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface PetNavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
  petName: string
}

export function PetNavigation({ activeSection, onSectionChange, petName }: PetNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      onSectionChange(sectionId)
      setIsMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onSectionChange('hero')
    setIsMobileMenuOpen(false)
  }

  const navItems = [
    { id: 'hero', label: `${petName}`, icon: Heart },
    { id: 'story', label: 'Life Story', icon: BookOpen },
    { id: 'memorial', label: 'Memorial', icon: MessageCircle }
  ]

  return (
    <>
      {/* 移动端菜单按钮 */}
      <div className="fixed top-4 right-4 z-50 lg:hidden">
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          size="icon"
          variant="outline"
          className="bg-background/90 backdrop-blur-sm border-border shadow-lg"
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-16 right-4 bg-background rounded-xl shadow-xl p-4 min-w-[200px] border border-border/50">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                )
              })}
              <div className="border-t border-border/50 pt-2 mt-2">
                <Button
                  onClick={scrollToTop}
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Back to Top
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 桌面端导航栏 - 细长优雅设计 */}
      <div className="bg-background/80 backdrop-blur-md rounded-2xl p-2 shadow-2xl border border-border/30 w-11 hover:bg-background/90 transition-all duration-300">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <Button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                variant={isActive ? "default" : "ghost"}
                size="icon"
                className={`relative group transition-all duration-300 w-7 h-7 rounded-lg ${
                  isActive 
                    ? 'bg-primary/90 text-primary-foreground shadow-md scale-105' 
                    : 'text-muted-foreground hover:text-primary hover:bg-accent/50 hover:scale-110'
                }`}
                title={item.label}
              >
                <Icon className="h-4 w-4" />
                
                {/* 悬浮提示 */}
                <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 
                  bg-popover text-popover-foreground text-xs px-2 py-1.5 rounded-md opacity-0 
                  group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap
                  pointer-events-none border border-border/50">
                  {item.label}
                  <div className="absolute left-full top-1/2 transform -translate-y-1/2 
                    w-0 h-0 border-l-3 border-l-popover border-t-3 border-t-transparent 
                    border-b-3 border-b-transparent"></div>
                </div>
              </Button>
            )
          })}
          
          {/* 回到顶部按钮 */}
          <div className="pt-1 border-t border-border/30">
            <Button
              onClick={scrollToTop}
              size="icon"
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-accent/50 hover:scale-110 transition-all duration-300 w-7 h-7 rounded-lg"
              title="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* 宠物名字显示 - 细长优雅设计 */}
      <div className="mt-2">
        <div className="bg-primary/70 text-primary-foreground text-[11px] font-medium px-1 py-1 rounded-lg shadow-sm text-center w-11 leading-tight">
          <div className="truncate">{petName}</div>
        </div>
      </div>

      {/* 滚动时显示的浮动指示器 */}
      {isScrolled && (
        <div className="fixed bottom-8 right-8 z-30 lg:hidden">
          <Button
            onClick={scrollToTop}
            size="icon"
            className="bg-primary text-primary-foreground shadow-lg"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      )}
    </>
  )
}