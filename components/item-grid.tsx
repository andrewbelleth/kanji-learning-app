"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

export interface GridItem {
  id: string
  character: string
  label: string
  sublabel: string
  level: number
  href: string
}

interface ItemGridProps {
  items: GridItem[]
  colorClass: string
  bgClass: string
}

export function ItemGrid({ items, colorClass, bgClass }: ItemGridProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 text-center">
        <p className="text-muted-foreground">Nenhum item encontrado</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-accent"
        >
          <span
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-lg text-2xl font-bold",
              bgClass,
              colorClass
            )}
          >
            {item.character}
          </span>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground">{item.sublabel}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
