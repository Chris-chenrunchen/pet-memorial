"use client"

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function GoogleAnalyticsEvents() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // 发送页面浏览事件
    if (typeof window !== 'undefined' && window.gtag) {
      const url = pathname + (searchParams?.toString() ? '?' + searchParams.toString() : '')
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [pathname, searchParams])

  return null
}

// 发送自定义事件的辅助函数
export const trackEvent = (
  action: string,
  category?: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// 声明 gtag 类型
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}