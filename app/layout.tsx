import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Samir Varma | Software Engineer",
  description:
    "Portfolio of Samir Varma — Computer Engineering & Mathematics student, software engineer focused on backend systems, ML infrastructure, and full-stack development.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable, fontMono.variable)}>
        {children}
      </body>
    </html>
  )
}
