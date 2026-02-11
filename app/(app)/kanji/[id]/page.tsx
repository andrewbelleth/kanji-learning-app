"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import {
  getKanjiById,
  getRadicalById,
  getVocabularyById,
  getTierForLevel,
} from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function KanjiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const kanji = getKanjiById(id)

  if (!kanji) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Kanji nao encontrado</p>
        <Link href="/kanji" className="mt-2 text-sm text-primary hover:underline">
          Voltar para kanji
        </Link>
      </div>
    )
  }

  const tier = getTierForLevel(kanji.level)
  const radicals = kanji.radicalIds.map((rid) => getRadicalById(rid)).filter(Boolean)
  const vocabulary = kanji.foundInVocabulary
    .map((vid) => getVocabularyById(vid))
    .filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/kanji"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para kanji
      </Link>

      {/* Character Header */}
      <div className="flex items-start gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-kanji/10 text-5xl font-bold text-kanji">
          {kanji.character}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">{kanji.meaningPt}</h1>
          <p className="text-lg text-muted-foreground">
            {kanji.meaning}
            {kanji.alternatives.length > 0 && (
              <span className="text-sm"> ({kanji.alternatives.join(", ")})</span>
            )}
          </p>
          <div className="flex items-center gap-2">
            <Badge style={{ backgroundColor: tier.bgColor, color: tier.textColor }}>
              Nivel {kanji.level}
            </Badge>
            <Badge variant="outline" className="border-kanji/30 text-kanji">
              Kanji
            </Badge>
          </div>
        </div>
      </div>

      {/* Readings */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Leituras</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"On'yomi"}
              </p>
              <div className="flex flex-wrap gap-2">
                {kanji.onyomi.length > 0 ? (
                  kanji.onyomi.map((r) => (
                    <span
                      key={r}
                      className="rounded-md bg-kanji/10 px-3 py-1 text-sm font-medium text-kanji"
                    >
                      {r}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Nenhuma</span>
                )}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {"Kun'yomi"}
              </p>
              <div className="flex flex-wrap gap-2">
                {kanji.kunyomi.length > 0 ? (
                  kanji.kunyomi.map((r) => (
                    <span
                      key={r}
                      className="rounded-md bg-secondary px-3 py-1 text-sm font-medium text-foreground"
                    >
                      {r}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">Nenhuma</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radical Composition */}
      {radicals.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Composicao de Radicais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {radicals.map(
                (r) =>
                  r && (
                    <Link
                      key={r.id}
                      href={`/radicals/${r.id}`}
                      className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3 transition-colors hover:border-radical/30 hover:bg-accent"
                    >
                      <span className="text-xl font-bold text-radical">{r.character}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{r.namePt}</p>
                        <p className="text-xs text-muted-foreground">{r.name}</p>
                      </div>
                    </Link>
                  )
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mnemonics */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Mnemonicos</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Significado (PT)
            </p>
            <p className="leading-relaxed text-foreground">{kanji.meaningMnemonicPt}</p>
          </div>
          <Separator />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Leitura (PT)
            </p>
            <p className="leading-relaxed text-foreground">{kanji.readingMnemonicPt}</p>
          </div>
          <Separator />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Significado (EN)
            </p>
            <p className="leading-relaxed text-muted-foreground">{kanji.meaningMnemonic}</p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Leitura (EN)
            </p>
            <p className="leading-relaxed text-muted-foreground">{kanji.readingMnemonic}</p>
          </div>
        </CardContent>
      </Card>

      {/* Found in Vocabulary */}
      {vocabulary.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Encontrado no Vocabulario</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {vocabulary.map(
                (v) =>
                  v && (
                    <Link
                      key={v.id}
                      href={`/vocabulary/${v.id}`}
                      className="flex items-center gap-3 rounded-lg border border-border bg-secondary p-3 transition-colors hover:border-vocabulary/30 hover:bg-accent"
                    >
                      <span className="text-xl font-bold text-vocabulary">{v.word}</span>
                      <div>
                        <p className="text-sm font-medium text-foreground">{v.meaningPt}</p>
                        <p className="text-xs text-muted-foreground">
                          {v.reading} - {v.meaning}
                        </p>
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
