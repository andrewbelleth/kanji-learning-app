"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { LevelTierInfo } from "@/lib/data"

interface DashboardLevelProgressProps {
  level: number
  tier: LevelTierInfo
  radicalsCount: number
  kanjiCount: number
  vocabularyCount: number
}

export function DashboardLevelProgress({
  level,
  tier,
  radicalsCount,
  kanjiCount,
  vocabularyCount,
}: DashboardLevelProgressProps) {
  const total = radicalsCount + kanjiCount + vocabularyCount
  // MVP: simulate some progress
  const learned = Math.floor(total * 0.3)
  const progressPercent = total > 0 ? Math.round((learned / total) * 100) : 0

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-bold"
            style={{ backgroundColor: tier.bgColor, color: tier.textColor }}
          >
            {level}
          </span>
          Progresso do Nivel {level}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {learned} / {total} itens aprendidos
              </span>
              <span className="font-medium text-foreground">{progressPercent}%</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-radical/10 p-3 text-center">
              <p className="text-2xl font-bold text-radical">{radicalsCount}</p>
              <p className="text-xs text-muted-foreground">Radicais</p>
            </div>
            <div className="rounded-lg bg-kanji/10 p-3 text-center">
              <p className="text-2xl font-bold text-kanji">{kanjiCount}</p>
              <p className="text-xs text-muted-foreground">Kanji</p>
            </div>
            <div className="rounded-lg bg-vocabulary/10 p-3 text-center">
              <p className="text-2xl font-bold text-vocabulary">{vocabularyCount}</p>
              <p className="text-xs text-muted-foreground">Vocabulario</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
