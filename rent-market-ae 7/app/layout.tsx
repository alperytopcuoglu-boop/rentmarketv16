import type { Metadata, Viewport } from 'next'
import './globals.css'
import BottomNav from '@/components/layout/BottomNav'

export const metadata: Metadata = {
  title: 'Rent Market AE — Dubai Car Rental Marketplace',
  description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles — daily, weekly and monthly rates.',
  keywords: 'car rental dubai, rent car dubai, sports car rental, SUV rental dubai, luxury car rental UAE, no deposit car rental, monthly car rental dubai',
  applicationName: 'Rent Market AE',
  authors: [{ name: 'Rent Market AE' }],
  openGraph: {
    title: 'Rent Market AE — Dubai Car Rental Marketplace',
    description: 'Browse and book from Dubai\'s top car rental providers. Sports cars, SUVs, luxury and exotic vehicles.',
    siteName: 'Rent Market AE',
    locale: 'en_AE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#f8f7f4',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-stone-100 min-h-screen">
        <main className="max-w-[480px] mx-auto relative bg-stone-50 min-h-screen shadow-[0_0_60px_rgba(0,0,0,0.10)]">
          {children}
          <BottomNav />
        </main>
      </body>
    </html>
  )
}
