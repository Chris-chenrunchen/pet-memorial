// Google Analytics 事件追踪使用示例
// 在需要追踪用户行为的组件中导入并使用

import { trackEvent } from '@/components/google-analytics'

// 示例1：按钮点击追踪
export const handleButtonClick = (buttonName: string) => {
  trackEvent('button_click', 'cta', buttonName)
  console.log(`Button clicked: ${buttonName}`)
}

// 示例2：表单提交追踪
export const handleFormSubmit = (formName: string) => {
  trackEvent('form_submit', 'contact', formName, 1)
  console.log(`Form submitted: ${formName}`)
}

// 示例3：页面特定事件追踪 - 宠物纪念创建
export const handlePetMemorialCreate = (petName: string) => {
  trackEvent('memorial_created', 'engagement', `pet_memorial_${petName}`, 1)
  console.log(`Pet memorial created for: ${petName}`)
}

// 示例4：博客文章互动追踪
export const handleBlogShare = (articleTitle: string) => {
  trackEvent('article_share', 'social', articleTitle)
  console.log(`Article shared: ${articleTitle}`)
}

// 示例5：用户注册/登录追踪
export const handleUserRegistration = (method: string) => {
  trackEvent('user_registration', 'authentication', method, 1)
  console.log(`User registered via: ${method}`)
}

export const handleUserLogin = (method: string) => {
  trackEvent('user_login', 'authentication', method)
  console.log(`User logged in via: ${method}`)
}

// 示例6：页面滚动深度追踪
export const handleScrollDepth = (depth: number) => {
  trackEvent('scroll_depth', 'engagement', `depth_${depth}%`, depth)
}

// 示例7：文件下载追踪
export const handleFileDownload = (fileName: string) => {
  trackEvent('file_download', 'resources', fileName)
  console.log(`File downloaded: ${fileName}`)
}