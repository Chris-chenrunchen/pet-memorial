import { Navigation } from "@/components/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Heart, Share2, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { getBlogPosts } from "@/lib/blog"
import { Metadata } from "next"

// SEO metadata for blog list page
export const metadata: Metadata = {
  title: 'Pet Memorial Blog - Healing Stories & Guidance',
  description: 'Discover heartwarming stories, expert guidance, and meaningful ways to honor and remember your beloved pets. Find support through pet loss and create lasting memorials.',
  keywords: ['pet memorial', 'pet loss', 'pet grief', 'pet remembrance', 'pet cemetery', 'pet funeral', 'pet ashes', 'pet urn', 'pet memorial ideas', 'rainbow bridge'],
  openGraph: {
    title: 'Pet Memorial Blog - Healing Stories & Guidance',
    description: 'Discover heartwarming stories, expert guidance, and meaningful ways to honor and remember your beloved pets.',
    type: 'website',
    images: [
      {
        url: '/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg',
        width: 1200,
        height: 630,
        alt: 'Pet Memorial Blog'
      }
    ],
    siteName: 'Pet Memorial'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pet Memorial Blog - Healing Stories & Guidance',
    description: 'Discover heartwarming stories, expert guidance, and meaningful ways to honor and remember your beloved pets.',
    images: ['/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg']
  },
  alternates: {
    canonical: '/blog'
  },
  robots: {
    index: true,
    follow: true
  }
}

export default function BlogPage() {
  const blogPosts = getBlogPosts()

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* H1 for SEO */}
        <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-12 text-center">
          Pet Memorial Blog
        </h1>
        
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="block">
              <Card className="p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/20 cursor-pointer">
                <div className="flex items-start gap-6">
                  {/* Left Avatar/Icon */}
                  <div className="flex-shrink-0">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={post.authorAvatar} alt={post.author} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.author.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  {/* Central Content Area */}
                  <div className="flex-1 min-w-0">
                    {/* H2 for SEO - article title */}
                    <h2 className="text-xl md:text-2xl font-serif text-foreground mb-3 hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <span className="text-foreground font-medium">{post.author}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right - Interaction */}
                  <div className="flex flex-col gap-3 items-end">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likes}</span>
                      </div>
                      
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.comments}</span>
                      </div>
                    </div>
                    
                    <div className="text-muted-foreground">
                      <Share2 className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}