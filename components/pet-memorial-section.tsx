"use client"

import { Pet } from "@/types/pet"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Flower, MessageCircle, Users } from "lucide-react"
import { useState, useEffect } from "react"

interface PetMemorialSectionProps {
  pet: Pet
}

interface GuestMessage {
  id: string
  name: string
  message: string
  timestamp: string
  offering?: string
}

interface Offering {
  type: 'candle' | 'flower'
  count: number
}

export function PetMemorialSection({ pet }: PetMemorialSectionProps) {
  const [messages, setMessages] = useState<GuestMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [visitorName, setVisitorName] = useState('')
  const [selectedOffering, setSelectedOffering] = useState<string>('')
  const [offerings, setOfferings] = useState<Offering[]>([
    { type: 'candle', count: 0 },
    { type: 'flower', count: 0 }
  ])

  // 从localStorage加载数据（模拟持久化）
  useEffect(() => {
    const savedMessages = localStorage.getItem(`memorial_${pet.id}_messages`)
    const savedOfferings = localStorage.getItem(`memorial_${pet.id}_offerings`)
    
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages))
    } else {
      // 初始化一些示例留言
      setMessages([
        {
          id: '1',
          name: 'Sarah',
          message: `${pet.name} was such a beautiful soul. I remember how gently they would greet everyone who visited. Their memory will live on forever in our hearts.`,
          timestamp: '2 days ago',
          offering: 'flower'
        },
        {
          id: '2',
          name: 'Mike',
          message: `Thinking of you during this difficult time. ${pet.name} brought so much joy to everyone who knew them.`,
          timestamp: '1 week ago',
          offering: 'candle'
        }
      ])
    }
    
    if (savedOfferings) {
      const parsedOfferings = JSON.parse(savedOfferings) as Offering[]
      setOfferings(parsedOfferings)
    }
  }, [pet.id])

  // 保存到localStorage
  const saveToLocalStorage = (newMessages: GuestMessage[], newOfferings: Offering[]) => {
    localStorage.setItem(`memorial_${pet.id}_messages`, JSON.stringify(newMessages))
    localStorage.setItem(`memorial_${pet.id}_offerings`, JSON.stringify(newOfferings))
  }

  const handleSubmitMessage = () => {
    if (!newMessage.trim() || !visitorName.trim()) return

    const newGuestMessage: GuestMessage = {
      id: Date.now().toString(),
      name: visitorName,
      message: newMessage,
      timestamp: 'Just now',
      offering: selectedOffering || undefined
    }

    const updatedMessages = [newGuestMessage, ...messages]
    setMessages(updatedMessages)
    
    // 如果选择了献礼，更新献礼计数
    if (selectedOffering) {
      const updatedOfferings = offerings.map(offering => 
        offering.type === selectedOffering 
          ? { ...offering, count: offering.count + 1 }
          : offering
      )
      setOfferings(updatedOfferings)
      saveToLocalStorage(updatedMessages, updatedOfferings)
    } else {
      saveToLocalStorage(updatedMessages, offerings)
    }

    // 重置表单
    setNewMessage('')
    setVisitorName('')
    setSelectedOffering('')
  }

  const handleOfferingClick = (offeringType: 'candle' | 'flower') => {
    const updatedOfferings = offerings.map(offering => 
      offering.type === offeringType 
        ? { ...offering, count: offering.count + 1 }
        : offering
    )
    setOfferings(updatedOfferings)
    saveToLocalStorage(messages, updatedOfferings)
    
    // 添加动画效果
    const button = document.getElementById(`offering-${offeringType}`)
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => {
        button.classList.remove('animate-pulse')
      }, 500)
    }
  }

  const getOfferingIcon = (type: 'candle' | 'flower') => {
    switch (type) {
      case 'candle': return <div className="text-5xl">🕯️</div>
      case 'flower': return <Flower className="h-16 w-16" />
      default: return <Heart className="h-12 w-12" />
    }
  }

  const getOfferingColor = (type: 'candle' | 'flower') => {
    switch (type) {
      case 'candle': return "bg-orange-100 text-orange-700 hover:bg-orange-200 border-orange-300"
      case 'flower': return "bg-pink-100 text-pink-700 hover:bg-pink-200 border-pink-300"
      default: return "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300"
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 标题 */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Heart className="h-8 w-8 text-primary" />
          <h2 className="text-4xl font-serif text-foreground">
            Memorial & Tributes
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Share your memories and light a candle for {pet.name}. Every tribute helps keep their spirit alive.
        </p>
      </div>

      <div className="space-y-12">
        {/* 虚拟献礼区域 */}
        <Card className="p-8 bg-background/80 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent rounded-lg">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Virtual Offerings</h3>
          </div>
          
          <p className="text-muted-foreground mb-6">
            Click to light a candle or offer a flower in memory of {pet.name}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            {offerings.map((offering) => (
              <Button
                key={offering.type}
                id={`offering-${offering.type}`}
                variant="outline"
                onClick={() => handleOfferingClick(offering.type)}
                className={`flex flex-col items-center gap-4 p-8 rounded-xl border-2 transition-all duration-300 hover:scale-105 bg-accent/50 text-foreground border-border/50 hover:bg-accent h-40 w-full`}
              >
                <div className="text-4xl mb-2">
                  {getOfferingIcon(offering.type)}
                </div>
                <div className="text-center">
                  <p className="font-semibold capitalize text-lg">{offering.type}</p>
                  <p className="text-sm opacity-75">{offering.count} offered</p>
                </div>
              </Button>
            ))}
          </div>
          
          {/* 献礼总数 */}
          <div className="bg-accent/30 p-4 rounded-lg text-center border border-border/50">
            <p className="text-foreground font-medium">
              <Users className="h-5 w-5 inline mr-2" />
              Total tributes: {offerings.reduce((sum, offering) => sum + offering.count, 0)}
            </p>
          </div>
        </Card>

        {/* 访客留言板 */}
        <Card className="p-8 bg-background/80 backdrop-blur-sm border-border/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-accent rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-foreground">Guestbook</h3>
          </div>
          
          {/* 留言表单 */}
          <div className="space-y-4 mb-8 p-6 bg-accent/30 rounded-xl border border-border/50">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Choose an Offering (Optional)
                </label>
                <select
                  value={selectedOffering}
                  onChange={(e) => setSelectedOffering(e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                >
                  <option value="">No offering</option>
                  <option value="candle">🕯️ Light a Candle</option>
                  <option value="flower">🌸 Flower</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Your Message
              </label>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Share your memories of ${pet.name} or send comforting words to the family...`}
                rows={4}
                className="w-full bg-background border-border"
              />
            </div>
            
            <Button 
              onClick={handleSubmitMessage}
              disabled={!newMessage.trim() || !visitorName.trim()}
              className="w-full bg-primary hover:bg-primary/90"
            >
              <Heart className="h-4 w-4 mr-2" />
              Share Your Message
            </Button>
          </div>
          
          {/* 留言列表 */}
          <div className="space-y-6">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No messages yet. Be the first to share your thoughts.</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className="bg-accent/30 rounded-xl p-6 border border-border/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                        {message.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{message.name}</p>
                        <p className="text-sm text-muted-foreground">{message.timestamp}</p>
                      </div>
                    </div>
                    
                    {message.offering && (
                      <div className="text-2xl" title={`Offered a ${message.offering}`}>
                        {message.offering === 'candle' && <span>🕯️</span>}
                        {message.offering === 'flower' && <Flower className="h-6 w-6 text-primary" />}
                      </div>
                    )}
                  </div>
                  
                  <p className="text-foreground leading-relaxed">{message.message}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}