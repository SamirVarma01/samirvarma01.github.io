import type React from "react"
import type { Metadata, Viewport } from "next"
import { Doto, Geist, Geist_Mono } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css"
import "./crt.css"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontDot = Doto({
  subsets: ["latin"],
  variable: "--font-doto",
})

export const metadata: Metadata = {
  title: "Samir Varma | Software Engineer",
  description:
    "Portfolio of Samir Varma — Computer Engineering & Mathematics student, software engineer focused on backend systems, ML infrastructure, and full-stack development.",
}

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn("crt-root", fontSans.variable, fontMono.variable, fontDot.variable)}>
      <body className="crt">
        {children}
      </body>
    </html>
  )
}
