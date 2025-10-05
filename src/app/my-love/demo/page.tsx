"use client"

import { PetMemorialPage } from "@/components/pet-memorial-page"

// 演示用的宠物数据
const demoPet = {
  id: "a1a9d2a2-82d1-4b58-862d-9e584d340c9a",
  user_id: "demo-user-id",
  name: "Buddy",
  nickname: "Buddy Bear",
  species: "dog",
  gender: "male",
  date_of_passing: "2015-03-15",
  date_first_met: "2016-04-20",
  owner_name: "Sarah Johnson",
  breed: "Golden Retriever",
  color: "Golden",
  weight: "65 lbs",
  personality: "Buddy was the most gentle and loving companion anyone could ask for. He had an incredible ability to sense when someone was sad and would always be there to comfort them with his warm presence.",
  favorite_activities: "Playing fetch in the park, swimming in the lake, cuddling on the couch, going for long walks, meeting new friends at the dog park",
  special_memories: "I'll never forget how Buddy would greet me at the door every single day with his tail wagging so hard his whole body would shake. He was there through my college graduation, my first job, and so many life changes. His unconditional love got me through some of the toughest times of my life.",
  messageToPet: "My dear Buddy, you were more than just a pet - you were my best friend, my confidant, and my family. Thank you for the 8 beautiful years you gave me. I miss you every single day, but I know you're running free in doggy heaven, chasing all the tennis balls you can find. Wait for me at the rainbow bridge, my sweet boy.",
  photo_urls: [
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=800&h=600&fit=crop"
  ],
  is_public: true,
  created_at: "2024-01-15T10:30:00Z",
  updated_at: "2024-01-15T10:30:00Z"
}

export default function DemoPetMemorial() {
  return <PetMemorialPage pet={demoPet} />
}