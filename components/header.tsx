"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BrainCircuit, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavLink{
  href: string,
  label: string,
}

export function Header({links} : {links : Array<NavLink>}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // const navLinks = [
  //   { href: "/user", label: "Home" },
  //   { href: "/user/analyze", label: "Prediction" },
  //   { href: "/user/results", label: "Scan Results" },
  //   { href: "/user/reports", label: "Reports" },
  //   { href: "/user/profile", label: "User Profile" },
  // ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/20 backdrop-blur-md transition-all duration-200 ${
        isScrolled ? "shadow-md py-2" : "py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <BrainCircuit className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-bold text-blue-900 text-lg">Brain Tumor AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-blue-300 text-blue-700"
                    : "text-blue-600 hover:bg-blue-200 hover:text-blue-700"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="ml-2 text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              Logout
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-blue-600 hover:bg-blue-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-3 px-2 mt-2 bg-blue-50 rounded-md">
            <div className="flex flex-col space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === link.href ? "bg-blue-100 text-blue-700" : "text-blue-600 hover:bg-blue-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 text-blue-600 border-blue-200 hover:bg-blue-100 w-full justify-start"
              >
                Logout
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

