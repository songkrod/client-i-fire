import type { Metadata } from 'next'
import './globals.css'
import { SocketProvider } from '@/contexts/SocketContext'

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
        </SocketProvider>
      </body>
    </html>
  )
}
