"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const navItems = [
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
]

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="h-16 max-w-6xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/myphoto.png"
            alt="Samir Varma"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover object-[50%_40%]"
          />
          <button
            onClick={() => onNavigate("hero")}
            className="text-[15px] font-medium tracking-tight hover:text-muted-foreground transition-colors"
          >
            Samir Varma
          </button>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm py-1 transition-colors border-b ${
                  activeSection === item.id
                    ? "text-foreground font-medium border-foreground"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex"
          >
            <Button size="sm" variant="outline">
              Resume
            </Button>
          </a>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="flex flex-col gap-1 mt-8">
                {navItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? "default" : "ghost"}
                    className="justify-start"
                    onClick={() => {
                      onNavigate(item.id)
                      setIsOpen(false)
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-2">
                  <Button variant="outline" className="w-full justify-start">
                    Resume
                  </Button>
                </a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
