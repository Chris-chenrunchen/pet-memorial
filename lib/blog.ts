import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

// 创建MarkdownIt实例，忽略类型检查
const md = new (MarkdownIt as any)({
  html: true,
  linkify: true,
  typographer: true
})

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  authorAvatar: string
  date: string
  readTime: string
  comments: number
  likes: number
  tags: string[]
  // SEO fields
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string[]
  ogImage?: string
  canonicalUrl?: string
  h1?: string
  h2?: string[]
}

const contentDirectory = path.join(process.cwd(), 'content/blog')

export function getBlogPosts(): BlogPost[] {
  try {
    const fileNames = fs.readdirSync(contentDirectory)
    const posts = fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map((fileName, index) => {
        const fullPath = path.join(contentDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        
        // Convert markdown to HTML
        const htmlContent = md.render(content)
        
        // Generate excerpt (first paragraph or first 200 characters)
        const excerpt = content.split('\n\n')[0].substring(0, 200) + '...'
        
        // Extract headings for SEO
        const headings = content.match(/^#{1,2}\s+(.+)$/gm) || []
        const h1 = headings.find(h => h.startsWith('# '))?.replace('# ', '') || data.title
        const h2 = headings.filter(h => h.startsWith('## ')).map(h => h.replace('## ', ''))
        
        return {
          id: index + 1,
          title: data.title || 'Untitled',
          slug: data.slug || fileName.replace('.md', ''),
          excerpt: data.excerpt || excerpt,
          content: htmlContent,
          author: data.author || 'Unknown Author',
          authorAvatar: data.authorAvatar || '/placeholder-user.jpg',
          date: data.date || new Date().toISOString(),
          readTime: data.readTime || '5 min read',
          comments: data.comments || 0,
          likes: data.likes || 0,
          tags: data.tags || [],
          // SEO fields
          metaTitle: data.metaTitle || data.title,
          metaDescription: data.metaDescription || excerpt.substring(0, 160),
          metaKeywords: data.metaKeywords || data.tags || [],
          ogImage: data.ogImage || '/peaceful-sunset-meadow-with-soft-golden-light-filt.jpg',
          canonicalUrl: data.canonicalUrl || `/blog/${data.slug || fileName.replace('.md', '')}`,
          h1: h1,
          h2: h2
        }
      })
      
    return posts
  } catch (error) {
    console.error('Error reading blog posts:', error)
    return []
  }
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find(post => post.slug === slug) || null
}