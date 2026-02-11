"use client"

import { useState } from "react"
import { SAMPLE_KANJI } from "@/lib/data"
import { LevelFilter } from "@/components/level-filter"
import { ItemGrid, type GridItem } from "@/components/item-grid"

export default function KanjiPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const filtered = selectedLevel
    ? SAMPLE_KANJI.filter((k) => k.level === selectedLevel)
    : SAMPLE_KANJI

  const items: GridItem[] = filtered.map((k) => ({
    id: k.id,
    character: k.character,
    label: k.meaningPt,
    sublabel: k.meaning,
    level: k.level,
    href: `/kanji/${k.id}`,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Kanji</h1>
        <p className="text-sm text-muted-foreground">
          Explore os kanji por nivel - {filtered.length} kanji
        </p>
      </div>

      <LevelFilter selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />

      <ItemGrid
        items={items}
        colorClass="text-kanji"
        bgClass="bg-kanji/10"
      />
    </div>
  )
}
