"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  level: number
  lessonsAvailable: number
  reviewsAvailable: number
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const MOCK_USER: User = {
  id: "user-1",
  name: "Estudante",
  email: "estudante@exemplo.com",
  level: 1,
  lessonsAvailable: 26,
  reviewsAvailable: 14,
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  // MVP: usuario ja logado por padrao
  const [user, setUser] = useState<User | null>(MOCK_USER)

  const login = useCallback(async (email: string, _password: string) => {
    // MVP: qualquer email/senha funciona
    await new Promise((resolve) => setTimeout(resolve, 500))
    setUser({ ...MOCK_USER, email })
    return true
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
