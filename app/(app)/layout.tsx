"use client"

import React from "react"
import { AppHeader } from "@/components/app-header"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="mx-auto max-w-7xl px-4 py-6">{children}</main>
    </div>
  )
}
