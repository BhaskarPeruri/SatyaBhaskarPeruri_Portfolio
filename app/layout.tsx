import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ElectricCursor from "@/components/nurui/electric-cursor"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Satya Bhaskar Peruri",
  description:
    "Security researcher, auditor, and blockchain developer specializing in smart contract security and Web3 development",
  generator: "Me",
  icons: {
    icon: [
      {
        url: "/sun9.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/sun9.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/sun9.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/sun9.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <ElectricCursor />
        <Analytics />
      </body>
    </html>
  )
}
