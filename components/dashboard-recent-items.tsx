"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Radical, Kanji, Vocabulary } from "@/lib/data"

interface DashboardRecentItemsProps {
  radicals: Radical[]
  kanji: Kanji[]
  vocabulary: Vocabulary[]
}

export function DashboardRecentItems({
  radicals,
  kanji,
  vocabulary,
}: DashboardRecentItemsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {/* Radicais */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <span className="h-2 w-2 rounded-full bg-radical" />
            Radicais do Nivel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {radicals.map((r) => (
              <Link
                key={r.id}
                href={`/radicals/${r.id}`}
                className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-radical/10 text-lg font-bold text-radical">
                  {r.character}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.namePt}</p>
                  <p className="text-xs text-muted-foreground">{r.name}</p>
                </div>
              </Link>
            ))}
            {radicals.length === 0 && (
              <p className="py-2 text-sm text-muted-foreground">Nenhum radical neste nivel</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Kanji */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <span className="h-2 w-2 rounded-full bg-kanji" />
            Kanji do Nivel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {kanji.map((k) => (
              <Link
                key={k.id}
                href={`/kanji/${k.id}`}
                className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-kanji/10 text-lg font-bold text-kanji">
                  {k.character}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{k.meaningPt}</p>
                  <p className="text-xs text-muted-foreground">{k.meaning}</p>
                </div>
              </Link>
            ))}
            {kanji.length === 0 && (
              <p className="py-2 text-sm text-muted-foreground">Nenhum kanji neste nivel</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Vocabulario */}
      <Card className="border-border bg-card">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base text-foreground">
            <span className="h-2 w-2 rounded-full bg-vocabulary" />
            Vocabulario do Nivel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2">
            {vocabulary.map((v) => (
              <Link
                key={v.id}
                href={`/vocabulary/${v.id}`}
                className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-accent"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-vocabulary/10 text-lg font-bold text-vocabulary">
                  {v.word}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{v.meaningPt}</p>
                  <p className="text-xs text-muted-foreground">{v.reading}</p>
                </div>
              </Link>
            ))}
            {vocabulary.length === 0 && (
              <p className="py-2 text-sm text-muted-foreground">
                Nenhum vocabulario neste nivel
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
