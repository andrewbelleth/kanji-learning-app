"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getRadicalById, getKanjiById, getTierForLevel } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function RadicalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const radical = getRadicalById(id)

  if (!radical) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Radical nao encontrado</p>
        <Link href="/radicals" className="mt-2 text-sm text-primary hover:underline">
          Voltar para radicais
        </Link>
      </div>
    )
  }

  const tier = getTierForLevel(radical.level)
  const relatedKanji = radical.foundInKanji
    .map((kid) => getKanjiById(kid))
    .filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/radicals"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para radicais
      </Link>

      {/* Character Header */}
      <div className="flex items-start gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-radical/10 text-5xl font-bold text-radical">
          {radical.character}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">{radical.namePt}</h1>
          <p className="text-lg text-muted-foreground">{radical.name}</p>
          <div className="flex items-center gap-2">
            <Badge
              style={{ backgroundColor: tier.bgColor, color: tier.textColor }}
            >
              Nivel {radical.level}
            </Badge>
            <Badge variant="outline" className="border-radical/30 text-radical">
              Radical
            </Badge>
          </div>
        </div>
      </div>

      {/* Mnemonic */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Mnemonico</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Portugues
            </p>
            <p className="leading-relaxed text-foreground">{radical.mnemonicPt}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Ingles
            </p>
            <p className="leading-relaxed text-muted-foreground">{radical.mnemonic}</p>
          </div>
        </CardContent>
      </Card>

      {/* Found in Kanji */}
      {relatedKanji.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Encontrado nos Kanji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {relatedKanji.map(
                (k) =>
                  k && (
                    <Link
                      key={k.id}
                      href={`/kanji/${k.id}`}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3 transition-colors hover:border-kanji/30 hover:bg-accent"
                    >
                      <span className="text-xl font-bold text-kanji">{k.character}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{k.meaningPt}</p>
                        <p className="text-xs text-muted-foreground">{k.meaning}</p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
