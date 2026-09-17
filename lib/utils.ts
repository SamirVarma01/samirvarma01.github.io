import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Next.js only auto-prefixes basePath for next/link and next/image.
// Plain <a href> tags to public/ assets need it applied manually.
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function withBasePath(path: string) {
  return `${basePath}${path}`
}
