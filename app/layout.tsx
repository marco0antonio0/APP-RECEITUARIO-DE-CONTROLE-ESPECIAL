import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Receituário de Controle Especial Gratuito',
  description: 'Gere online e gratuitamente receituários de controle especial veterinário com validade legal e personalização.',
  generator: 'Next.js',
  keywords: ['receituário veterinário', 'receita controle especial', 'gratuito', 'online', 'veterinária', 'medicamentos controlados'],
  openGraph: {
    title: 'Receituário de Controle Especial Gratuito',
    description: 'Plataforma gratuita para criação de receituários veterinários controlados. Personalize e baixe em PDF.',
    url: 'https://seusite.com',
    siteName: 'Receituário Veterinário',
    images: [
      {
        url: 'https://seusite.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Receituário de Controle Especial Gratuito',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Receituário de Controle Especial Gratuito',
    description: 'Crie receituários veterinários com validade legal gratuitamente e baixe em PDF.',
    images: ['https://seusite.com/og-image.png'],
  },
  metadataBase: new URL('https://seusite.com'),
  themeColor: '#ffffff',
  category: 'veterinária',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/iconSite.png" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  )
}
