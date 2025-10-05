"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, signOut } = useAuth()

  const navItems = [
    { name: "Home", href: "/" },
    { name: "My Love", href: "/my-love" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ]

  const authItems = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register" },
  ]

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="inline-block px-4 py-2 text-xl font-serif text-foreground hover:text-primary transition-colors duration-200">
              Pet Heaven
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {/* Auth Links */}
              <div className="flex items-center space-x-3 ml-8">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground">
                      Welcome, {user.email?.split("@")[0]}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={signOut}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login">
                      <Button 
                        variant="outline" 
                        size="default"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-4 py-2 text-sm font-medium transition-all duration-200"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button 
                        size="default"
                        className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                      >
                        Register
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-border">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground block px-3 py-2 text-base font-medium transition-colors duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Auth Links */}
              <div className="border-t border-border pt-4 mt-2 space-y-3">
                {user ? (
                  <>
                    <div className="text-muted-foreground block px-3 py-2 text-base font-medium">
                      Welcome, {user.email?.split("@")[0]}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        signOut()
                        setIsOpen(false)
                      }}
                      className="text-muted-foreground hover:text-foreground justify-start w-full"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="px-3 space-y-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline" 
                        size="default"
                        className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-2 text-base font-medium"
                      >
                        Login
                      </Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                      <Button 
                        size="default"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 text-base font-medium shadow-sm"
                      >
                        Register
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
