"use client"

import { useAuth } from "@/lib/auth-context"
import { getTierForLevel, SAMPLE_RADICALS, SAMPLE_KANJI, SAMPLE_VOCABULARY } from "@/lib/data"
import { DashboardStats } from "@/components/dashboard-stats"
import { DashboardLevelProgress } from "@/components/dashboard-level-progress"
import { DashboardRecentItems } from "@/components/dashboard-recent-items"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  const tier = getTierForLevel(user.level)
  const levelRadicals = SAMPLE_RADICALS.filter((r) => r.level === user.level)
  const levelKanji = SAMPLE_KANJI.filter((k) => k.level === user.level)
  const levelVocabulary = SAMPLE_VOCABULARY.filter((v) => v.level === user.level)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bem-vindo, {user.name}
        </h1>
        <p className="text-sm text-muted-foreground">
          Nivel {user.level} - {tier.nameJp} {tier.name}
        </p>
      </div>

      <DashboardStats
        lessonsAvailable={user.lessonsAvailable}
        reviewsAvailable={user.reviewsAvailable}
        level={user.level}
        tier={tier}
      />

      <DashboardLevelProgress
        level={user.level}
        tier={tier}
        radicalsCount={levelRadicals.length}
        kanjiCount={levelKanji.length}
        vocabularyCount={levelVocabulary.length}
      />

      <DashboardRecentItems
        radicals={levelRadicals.slice(0, 4)}
        kanji={levelKanji.slice(0, 4)}
        vocabulary={levelVocabulary.slice(0, 4)}
      />
    </div>
  )
}
