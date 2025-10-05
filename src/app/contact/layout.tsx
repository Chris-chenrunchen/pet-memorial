import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Pet Heaven",
  description: "Get in touch with Pet Heaven for questions about pet memorial services and support.",
  alternates: {
    canonical: "https://petheaven.top/contact"
  }
}

export default function ContactLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}