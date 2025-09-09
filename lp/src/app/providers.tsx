"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"
import React from "react"

const SessionProvider = NextAuthSessionProvider as unknown as React.ComponentType<any>

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
