import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import { SocketProvider } from '@/contexts/SocketContext'

import './globals.css'

export const metadata: Metadata = {
  title: 'iFire',
  description: 'iFire Game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SocketProvider>
          {children}
          <Toaster position='top-center' />
        </SocketProvider>
      </body>
    </html>
  )
}
