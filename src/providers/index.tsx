'use client'

import { PropsWithChildren } from 'react'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@/providers/theme-provider'

export function Providers({ children }: PropsWithChildren) {
  return (
    <SessionProvider>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
} 