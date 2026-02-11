"use client"

import { useState } from "react"
import { SAMPLE_RADICALS } from "@/lib/data"
import { LevelFilter } from "@/components/level-filter"
import { ItemGrid, type GridItem } from "@/components/item-grid"

export default function RadicalsPage() {
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null)

  const filtered = selectedLevel
    ? SAMPLE_RADICALS.filter((r) => r.level === selectedLevel)
    : SAMPLE_RADICALS

  const items: GridItem[] = filtered.map((r) => ({
    id: r.id,
    character: r.character,
    label: r.namePt,
    sublabel: r.name,
    level: r.level,
    href: `/radicals/${r.id}`,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Radicais</h1>
        <p className="text-sm text-muted-foreground">
          Explore os radicais por nivel - {filtered.length} radicais
        </p>
      </div>

      <LevelFilter selectedLevel={selectedLevel} onSelectLevel={setSelectedLevel} />

      <ItemGrid
        items={items}
        colorClass="text-radical"
        bgClass="bg-radical/10"
      />
    </div>
  )
}
