import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Chakra_Petch } from 'next/font/google'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const chakraPetch = Chakra_Petch({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-p3r',
})

export const metadata: Metadata = {
  title: 'Oliver Martinez — Software Engineer | S.E.E.S. Special Ops',
  description:
    'Portofolio gamified Oliver Martinez, Software Engineer bertema Persona 3 Reload. Mengarungi Tartarus pengembangan software web & sistem modern.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#030816',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" className={`dark ${geist.variable} ${chakraPetch.variable}`}>
      <body className="antialiased font-sans bg-[#030816] text-[#e0f2fe] selection:bg-[#00e5ff] selection:text-[#030816] overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
