import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MockTest System',
  description: 'Complete online mock test platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
