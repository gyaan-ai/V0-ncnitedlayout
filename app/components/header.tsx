"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Our Team", href: "/our-team" },
    { name: "National Team", href: "/national-team" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Calendar", href: "/calendar" },
    { name: "News", href: "/blog" },
  ]

  return (
    <header className="bg-[#1a1b5c] shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-black text-white font-oswald">NC UNITED</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-bold transition-colors duration-200 ${
                  pathname === item.href
                    ? "text-white bg-[#bc0c03] px-3 py-1 rounded"
                    : "text-white hover:text-gray-200"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`text-sm font-bold transition-colors duration-200 flex items-center gap-1 px-3 py-1 rounded ${
                  pathname.startsWith("/recruiting") ? "text-white bg-[#bc0c03]" : "text-white hover:text-gray-200"
                }`}
              >
                Recruiting Portal
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#bc0c03] border-[#bc0c03] border-2 shadow-lg">
                <DropdownMenuItem asChild className="text-white hover:bg-[#a00a02] focus:bg-[#a00a02] font-normal">
                  <Link href="/recruiting/commits" className="text-white">
                    College Commitments
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Login Button - Always visible */}
          <div className="hidden md:block">
            <Button
              onClick={() => router.push("/login")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2"
            >
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 text-white"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1a1b5c]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-[#bc0c03]">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-bold transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-white bg-[#bc0c03]"
                      : "text-white hover:text-gray-200 hover:bg-[#343577]"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`block px-3 py-2 text-base font-bold transition-colors duration-200 w-full text-left text-white hover:text-gray-200 hover:bg-[#343577]`}
                >
                  Recruiting Portal
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-[#bc0c03] border-[#bc0c03] border-2 shadow-lg">
                  <DropdownMenuItem asChild className="text-white hover:bg-[#a00a02] focus:bg-[#a00a02] font-normal">
                    <Link href="/recruiting/commits" onClick={() => setIsMenuOpen(false)} className="text-white">
                      College Commitments
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Login Button */}
              <div className="px-3 py-2">
                <Button
                  onClick={() => {
                    router.push("/login")
                    setIsMenuOpen(false)
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Sign In
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
