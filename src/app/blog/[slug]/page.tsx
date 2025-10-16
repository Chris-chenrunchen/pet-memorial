import { Navigation } from "@/components/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Tag, Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog"
import { Metadata } from "next"
import { CTASection } from "@/components/cta-section"
import Link from "next/link"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// SEO metadata generation
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The blog post you are looking for does not exist.'
    }
  }
  
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords || post.tags,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.ogImage || '/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg',
          width: 1200,
          height: 630,
          alt: post.title
        }
      ],
      tags: post.tags
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.ogImage || '/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg'],
      creator: post.author
    },
    alternates: {
      canonical: `https://petheaven.top${post.canonicalUrl || `/blog/${post.slug}`}`
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)
  const allPosts = getBlogPosts()
  const otherPosts = allPosts.filter(p => p.slug !== params.slug).slice(0, 5) // 获取5篇其他文章
  
  if (!post) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-serif text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground">The blog post you're looking for doesn't exist.</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Related Posts */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {otherPosts.map((relatedPost) => (
                    <Link 
                      key={relatedPost.id} 
                      href={`/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <div className="border-b border-border pb-4 last:border-0 last:pb-0">
                        <h4 className="text-foreground group-hover:text-primary transition-colors font-medium mb-1 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{relatedPost.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
              
              {/* Back to Blog Link - Sidebar */}
              <Card className="p-4">
                <Link 
                  href="/blog" 
                  className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  <span>← Back to All Posts</span>
                </Link>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4">
            {/* Article Header */}
            <div className="mb-8">
              {/* H1 for SEO - can be customized via post.h1 */}
              <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-6 leading-tight">
                {post.h1 || post.title}
              </h1>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.authorAvatar} alt={post.author} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-foreground font-medium">{post.author}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full flex items-center gap-1"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Article Content - Expanded width and increased line spacing */}
            <Card className="p-8 md:p-10 mb-8">
              <article 
                className="prose prose-lg max-w-none text-foreground prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-code:text-foreground prose-pre:text-foreground prose-blockquote:text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </Card>

            {/* Interaction Area */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4" />
                  <span>{post.likes} Likes</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>{post.comments} Comments</span>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <CTASection />
    </main>
  )
}