"use client"

import { useState } from "react"
import { SAMPLE_VOCABULARY } from "@/lib/data"
import { LevelFilter } from "@/components/level-filter"
import { ItemGrid, type GridItem } from "@/components/item-grid"

export default function VocabularyPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const filtered = selectedLevel
    ? SAMPLE_VOCABULARY.filter((v) => v.level === selectedLevel)
    : SAMPLE_VOCABULARY

  const items: GridItem[] = filtered.map((v) => ({
    id: v.id,
    character: v.word,
    label: v.meaningPt,
    sublabel: v.reading,
    level: v.level,
    href: `/vocabulary/${v.id}`,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Vocabulario</h1>
        <p className="text-sm text-muted-foreground">
          Explore o vocabulario por nivel - {filtered.length} palavras
        </p>
      </div>

      <LevelFilter selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />

      <ItemGrid
        items={items}
        colorClass="text-vocabulary"
        bgClass="bg-vocabulary/10"
      />
    </div>
  )
}
