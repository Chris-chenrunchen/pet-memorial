"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Upload, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAuth } from "@/components/auth-provider"

import { PetFormData } from "@/types/pet"

interface PetFormProps {
  onSubmit: (data: PetFormData) => Promise<void>
  onCancel?: () => void
  initialData?: Partial<PetFormData>
  submitButtonText?: string
  isLoading?: boolean
}

export function PetForm({ onSubmit, onCancel, initialData, submitButtonText = "Create Memorial", isLoading: externalLoading }: PetFormProps) {
  const { supabase } = useAuth()
  const [formData, setFormData] = useState<PetFormData>({
    name: initialData?.name || "",
    nickname: initialData?.nickname || "",
    species: initialData?.species || "",
    gender: initialData?.gender || "",
    dateOfPassing: initialData?.dateOfPassing || undefined,
    dateFirstMet: initialData?.dateFirstMet || undefined,
    ownerName: initialData?.ownerName || "",
    breed: initialData?.breed || "",
    color: initialData?.color || "",
    weight: initialData?.weight || "",
    microchipNumber: initialData?.microchipNumber || "",
    personality: initialData?.personality || "",
    favoriteActivities: initialData?.favoriteActivities || "",
    specialMemories: initialData?.specialMemories || "",
    messageToPet: initialData?.messageToPet || "",
    photoUrls: initialData?.photoUrls || [],
    isPublic: initialData?.isPublic ?? false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadingImages, setUploadingImages] = useState(false)
  const isLoading = externalLoading || isSubmitting || uploadingImages

  const handleInputChange = (field: keyof PetFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    // 验证文件数量和总数量限制
    const currentPhotoCount = formData.photoUrls?.length || 0
    const maxPhotosPerUser = 3
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    const maxFileSize = 5 * 1024 * 1024 // 5MB

    if (currentPhotoCount >= maxPhotosPerUser) {
      alert(`You can only upload up to ${maxPhotosPerUser} photos per pet memorial.`)
      return
    }

    setUploadingImages(true)
    const uploadedUrls: string[] = []
    let processedFiles = 0

    try {
      // 处理文件上传
      for (let i = 0; i < files.length && (currentPhotoCount + uploadedUrls.length) < maxPhotosPerUser; i++) {
        const file = files[i]
        
        // 验证文件格式
        if (!allowedFileTypes.includes(file.type)) {
          alert(`File "${file.name}" is not supported. Only JPEG, PNG, and GIF formats are allowed.`)
          continue
        }

        // 验证文件大小
        if (file.size > maxFileSize) {
          alert(`File "${file.name}" is too large. Maximum file size is 5MB.`)
          continue
        }

        const fileName = `pet-memorials/${Date.now()}-${file.name}`
        
        const { data, error } = await supabase.storage
          .from("pet-photos")
          .upload(fileName, file)

        if (error) {
          console.error("图片上传失败:", error)
          continue
        }

        // 获取公开 URL
        const { data: { publicUrl } } = supabase.storage
          .from("pet-photos")
          .getPublicUrl(fileName)

        uploadedUrls.push(publicUrl)
        processedFiles++
      }
      
      if (processedFiles > 0) {
        setFormData(prev => ({
          ...prev,
          photoUrls: [...(prev.photoUrls || []), ...uploadedUrls]
        }))
      }

      // 如果还有剩余文件无法上传，给出提示
      if (files.length > processedFiles && (currentPhotoCount + uploadedUrls.length) >= maxPhotosPerUser) {
        alert(`Only ${uploadedUrls.length} photo(s) were uploaded. You can only have up to ${maxPhotosPerUser} photos per pet memorial.`)
      }
    } catch (error) {
      console.error("图片上传失败:", error)
      alert("Failed to upload some images. Please try again.")
    } finally {
      setUploadingImages(false)
      // 清空文件输入，允许重复选择相同文件
      event.target.value = ''
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photoUrls: (prev.photoUrls || []).filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error("表单提交失败:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">
          {initialData ? "Edit Pet Memorial" : "Create Pet Memorial"}
        </CardTitle>
        <CardDescription>
          {initialData 
            ? "Update your beloved pet's memorial information" 
            : "Fill in your beloved pet's information to create a beautiful memorial"
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Your pet's name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="nickname">Nickname</Label>
              <Input
                id="nickname"
                value={formData.nickname}
                onChange={(e) => handleInputChange("nickname", e.target.value)}
                placeholder="Your pet's nickname"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="species">Species *</Label>
              <Select value={formData.species} onValueChange={(value) => handleInputChange("species", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select species" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog">Dog</SelectItem>
                  <SelectItem value="cat">Cat</SelectItem>
                  <SelectItem value="rabbit">Rabbit</SelectItem>
                  <SelectItem value="bird">Bird</SelectItem>
                  <SelectItem value="hamster">Hamster</SelectItem>
                  <SelectItem value="guinea_pig">Guinea Pig</SelectItem>
                  <SelectItem value="fish">Fish</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="unknown">Unknown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Date of Passing</Label>
              <div className="p-3 border rounded-lg bg-white shadow-sm">
                <Calendar
                  mode="single"
                  selected={formData.dateOfPassing ? new Date(formData.dateOfPassing + 'T12:00:00') : undefined}
                  onSelect={(date) => {
                    if (date) {
                      // 使用本地时区而不是UTC，避免时区偏移问题
                      const year = date.getFullYear()
                      const month = String(date.getMonth() + 1).padStart(2, '0')
                      const day = String(date.getDate()).padStart(2, '0')
                      handleInputChange("dateOfPassing", `${year}-${month}-${day}`)
                    }
                  }}
                  className="rounded-md"
                  captionLayout="label"
                  fromYear={2000}
                  toYear={2030}
                />
              </div>
              {formData.dateOfPassing && (
                <p className="text-sm text-gray-600">
                  Selected: {new Date(formData.dateOfPassing + 'T12:00:00').toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date We First Met</Label>
              <div className="p-3 border rounded-lg bg-white shadow-sm">
                <Calendar
                  mode="single"
                  selected={formData.dateFirstMet ? new Date(formData.dateFirstMet + 'T12:00:00') : undefined}
                  onSelect={(date) => {
                    if (date) {
                      // 使用本地时区而不是UTC，避免时区偏移问题
                      const year = date.getFullYear()
                      const month = String(date.getMonth() + 1).padStart(2, '0')
                      const day = String(date.getDate()).padStart(2, '0')
                      handleInputChange("dateFirstMet", `${year}-${month}-${day}`)
                    }
                  }}
                  className="rounded-md"
                  captionLayout="label"
                  fromYear={2000}
                  toYear={2030}
                />
              </div>
              {formData.dateFirstMet && (
                <p className="text-sm text-gray-600">
                  Selected: {new Date(formData.dateFirstMet + 'T12:00:00').toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ownerName">Owner's Name *</Label>
            <Input
              id="ownerName"
              value={formData.ownerName}
              onChange={(e) => handleInputChange("ownerName", e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          {/* 详细信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="breed">Breed</Label>
              <Input
                id="breed"
                value={formData.breed}
                onChange={(e) => handleInputChange("breed", e.target.value)}
                placeholder="e.g., Golden Retriever"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={formData.color}
                onChange={(e) => handleInputChange("color", e.target.value)}
                placeholder="e.g., Golden"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input
                id="weight"
                value={formData.weight}
                onChange={(e) => handleInputChange("weight", e.target.value)}
                placeholder="e.g., 25 lbs"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="microchipNumber">Microchip Number</Label>
            <Input
              id="microchipNumber"
              value={formData.microchipNumber}
              onChange={(e) => handleInputChange("microchipNumber", e.target.value)}
              placeholder="Microchip identification number"
            />
          </div>

          {/* 个性描述 */}
          <div className="space-y-4">
            <Label>Personality</Label>
            
            {/* 性格标签选择 */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Choose personality traits:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Playful", "Gentle", "Loyal", "Brave", "Curious", 
                  "Affectionate", "Energetic", "Calm", "Intelligent", "Funny",
                  "Cute", "Elegant", "Independent", "Social", "Shy",
                  "Adventurous", "Protective", "Patient", "Loving", "Sweet"
                ].map((trait) => {
                  const isSelected = formData.personality?.includes(trait) || false
                  return (
                    <button
                      key={trait}
                      type="button"
                      onClick={() => {
                        const currentTraits = formData.personality ? formData.personality.split(", ").filter(t => t.trim()) : []
                        let newTraits: string[]
                        
                        if (isSelected) {
                          // 移除已选择的标签
                          newTraits = currentTraits.filter(t => t !== trait)
                        } else {
                          // 添加新标签
                          newTraits = [...currentTraits, trait]
                        }
                        
                        handleInputChange("personality", newTraits.join(", "))
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      {trait}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* 自定义描述输入 */}
            <Textarea
              id="personality"
              value={formData.personality}
              onChange={(e) => handleInputChange("personality", e.target.value)}
              placeholder="Or describe your pet's personality in your own words..."
              rows={3}
            />
          </div>

          {/* 爱好活动 */}
          <div className="space-y-4">
            <Label>Favorite Activities</Label>
            
            {/* 活动标签选择 */}
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Choose favorite activities:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Playing fetch", "Walking", "Running", "Sleeping", "Eating",
                  "Playing with toys", "Cuddling", "Watching TV", "Playing with other pets",
                  "Exploring", "Swimming", "Climbing", "Hiding", "Barking/Meowing",
                  "Chasing", "Digging", "Jumping", "Rolling", "Sunbathing"
                ].map((activity) => {
                  const isSelected = formData.favoriteActivities?.includes(activity) || false
                  return (
                    <button
                      key={activity}
                      type="button"
                      onClick={() => {
                        const currentActivities = formData.favoriteActivities ? formData.favoriteActivities.split(", ").filter(a => a.trim()) : []
                        let newActivities: string[]
                        
                        if (isSelected) {
                          newActivities = currentActivities.filter(a => a !== activity)
                        } else {
                          newActivities = [...currentActivities, activity]
                        }
                        
                        handleInputChange("favoriteActivities", newActivities.join(", "))
                      }}
                      className={`px-3 py-1 rounded-full text-sm border transition-all ${
                        isSelected
                          ? "bg-primary text-primary-foreground border-primary shadow-sm"
                          : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      {activity}
                    </button>
                  )
                })}
              </div>
            </div>
            
            <Textarea
              id="favoriteActivities"
              value={formData.favoriteActivities}
              onChange={(e) => handleInputChange("favoriteActivities", e.target.value)}
              placeholder="Or describe your pet's favorite activities..."
              rows={3}
            />
          </div>

          {/* 特殊记忆 */}
          <div className="space-y-2">
            <Label htmlFor="specialMemories">Special Memories</Label>
            <Textarea
              id="specialMemories"
              value={formData.specialMemories}
              onChange={(e) => handleInputChange("specialMemories", e.target.value)}
              placeholder="Share your favorite memories..."
              rows={4}
            />
          </div>

          {/* 主人想对宠物说的话 */}
          <div className="space-y-2">
            <Label htmlFor="messageToPet">Message to Your Pet</Label>
            <Textarea
              id="messageToPet"
              value={formData.messageToPet || ""}
              onChange={(e) => handleInputChange("messageToPet", e.target.value)}
              placeholder="What would you like to say to your pet?"
              rows={4}
            />
          </div>

          {/* 图片上传 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Photos</Label>
              <p className="text-sm text-muted-foreground">
                {formData.photoUrls?.length || 0}/3 photos • Max 5MB each • JPEG, PNG, GIF only
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(formData.photoUrls || []).map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Pet photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              
              {(formData.photoUrls?.length || 0) < 3 && (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">Upload Photo</span>
                  <input
                    type="file"
                    multiple
                    accept=".jpeg,.jpg,.png,.gif"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploadingImages || (formData.photoUrls?.length || 0) >= 3}
                  />
                </label>
              )}
            </div>
            {uploadingImages && (
              <p className="text-sm text-muted-foreground">Uploading images...</p>
            )}
          </div>

          {/* 公开设置 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="space-y-1">
              <Label htmlFor="isPublic" className="text-base font-medium">Make this memorial public</Label>
              <p className="text-sm text-muted-foreground">
                Allow others to view and share your pet's memorial
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={formData.isPublic || false}
              onClick={() => handleInputChange("isPublic", !formData.isPublic)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                formData.isPublic ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  formData.isPublic ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : submitButtonText}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}