import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Container from '@/components/containter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Transcribely',
  description: 'Highly accurate transcriptions for audio.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Container>
        <Navbar />
        {children}
        </Container>
      </body>
    </html>
  )
}
