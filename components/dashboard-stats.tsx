"use client"

import Link from "next/link"
import { BookOpen, RefreshCw, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { LevelTierInfo } from "@/lib/data"

interface DashboardStatsProps {
  lessonsAvailable: number
  reviewsAvailable: number
  level: number
  tier: LevelTierInfo
}

export function DashboardStats({
  lessonsAvailable,
  reviewsAvailable,
  level,
  tier,
}: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Link href="/lessons" className="block">
        <Card className="border-border bg-card transition-colors hover:border-primary/50 hover:bg-primary/5">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Licoes Disponiveis</p>
              <p className="text-2xl font-bold text-foreground">{lessonsAvailable}</p>
              <p className="text-xs text-primary">Clique para iniciar</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Link href="/reviews" className="block">
        <Card className="border-border bg-card transition-colors hover:border-chart-2/50 hover:bg-chart-2/5">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
              <RefreshCw className="h-6 w-6" style={{ color: "hsl(25, 95%, 53%)" }} />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Revisoes Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{reviewsAvailable}</p>
              <p className="text-xs text-chart-2">Clique para iniciar</p>
            </div>
          </CardContent>
        </Card>
      </Link>

      <Card className="border-border bg-card">
        <CardContent className="flex items-center gap-4 p-5">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
            style={{ backgroundColor: `${tier.bgColor}15` }}
          >
            <TrendingUp className="h-6 w-6" style={{ color: tier.color }} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Nivel Atual</p>
            <p className="text-2xl font-bold text-foreground">
              {level}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {tier.nameJp} {tier.name}
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
