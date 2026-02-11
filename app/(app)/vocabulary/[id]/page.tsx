"use client"

import { use } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getVocabularyById, getKanjiById, getTierForLevel } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function VocabularyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const vocab = getVocabularyById(id)

  if (!vocab) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">Vocabulario nao encontrado</p>
        <Link href="/vocabulary" className="mt-2 text-sm text-primary hover:underline">
          Voltar para vocabulario
        </Link>
      </div>
    )
  }

  const tier = getTierForLevel(vocab.level)
  const kanjiList = vocab.kanjiIds.map((kid) => getKanjiById(kid)).filter(Boolean)

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/vocabulary"
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para vocabulario
      </Link>

      {/* Word Header */}
      <div className="flex items-start gap-6">
        <div className="flex h-24 min-w-24 items-center justify-center rounded-xl bg-vocabulary/10 px-4 text-4xl font-bold text-vocabulary">
          {vocab.word}
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-foreground">{vocab.meaningPt}</h1>
          <p className="text-lg text-muted-foreground">{vocab.meaning}</p>
          <div className="flex flex-wrap items-center gap-2">
            <Badge style={{ backgroundColor: tier.bgColor, color: tier.textColor }}>
              Nivel {vocab.level}
            </Badge>
            <Badge variant="outline" className="border-vocabulary/30 text-vocabulary">
              Vocabulario
            </Badge>
            <Badge variant="outline" className="text-muted-foreground">
              {vocab.wordType}
            </Badge>
          </div>
        </div>
      </div>

      {/* Reading */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Leitura</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="rounded-md bg-vocabulary/10 px-4 py-2 text-xl font-medium text-vocabulary">
            {vocab.reading}
          </span>
        </CardContent>
      </Card>

      {/* Explanations */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Explicacao</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Significado (PT)
            </p>
            <p className="leading-relaxed text-foreground">{vocab.meaningExplanationPt}</p>
          </div>
          <Separator />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Leitura (PT)
            </p>
            <p className="leading-relaxed text-foreground">{vocab.readingExplanationPt}</p>
          </div>
          <Separator />
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Significado (EN)
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {vocab.meaningExplanation}
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Leitura (EN)
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {vocab.readingExplanation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Context Sentences */}
      {vocab.contextSentences.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Frases de Contexto</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {vocab.contextSentences.map((sentence, i) => (
                <div key={`sentence-${vocab.id}-${i}`} className="rounded-lg bg-secondary p-4">
                  <p className="text-lg font-medium text-foreground">{sentence.ja}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{sentence.pt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Kanji Composition */}
      {kanjiList.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Composicao de Kanji</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {kanjiList.map(
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
                        <p className="text-xs text-muted-foreground">
                          {k.onyomi.join(", ")} - {k.meaning}
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
