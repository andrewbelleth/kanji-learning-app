"use client"

import { LEVEL_TIERS, type LevelTierInfo } from "@/lib/data"
import { cn } from "@/lib/utils"

interface LevelFilterProps {
  selectedLevel: number | null
  onSelectLevel: (level: number | null) => void
}

export function LevelFilter({ selectedLevel, onSelectLevel }: LevelFilterProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectLevel(null)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
            selectedLevel === null
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-accent"
          )}
        >
          Todos
        </button>
        {LEVEL_TIERS.map((tier) => (
          <TierButton
            key={tier.id}
            tier={tier}
            selectedLevel={selectedLevel}
            onSelectLevel={onSelectLevel}
          />
        ))}
      </div>
      {selectedLevel !== null && (
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 60 }, (_, i) => i + 1)
            .filter((l) => {
              if (selectedLevel === null) return true
              const tier = LEVEL_TIERS.find((t) => t.levels.includes(selectedLevel))
              return tier?.levels.includes(l)
            })
            .map((l) => (
              <button
                type="button"
                key={l}
                onClick={() => onSelectLevel(l)}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded text-xs font-medium transition-colors",
                  l === selectedLevel
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-accent"
                )}
              >
                {l}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

function TierButton({
  tier,
  selectedLevel,
  onSelectLevel,
}: {
  tier: LevelTierInfo
  selectedLevel: number | null
  onSelectLevel: (level: number | null) => void
}) {
  const isActive = selectedLevel !== null && tier.levels.includes(selectedLevel)

  return (
    <button
      type="button"
      onClick={() => onSelectLevel(tier.levels[0])}
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        isActive
          ? "text-white"
          : "bg-secondary text-secondary-foreground hover:bg-accent"
      )}
      style={
        isActive
          ? { backgroundColor: tier.bgColor, color: tier.textColor }
          : undefined
      }
    >
      {tier.nameJp} {tier.name}
    </button>
  )
}
