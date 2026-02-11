"use client"

import { Check, X, Home, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReviewItem, ReviewQuestionType } from "@/lib/data"

interface AnswerResult {
  item: ReviewItem
  questionType: ReviewQuestionType
  userAnswer: string
  correct: boolean
}

interface ReviewSummaryProps {
  results: AnswerResult[]
  onRetry: () => void
  onGoHome: () => void
}

function getTypeBgClass(type: ReviewItem["type"]): string {
  switch (type) {
    case "radical":
      return "bg-radical"
    case "kanji":
      return "bg-kanji"
    case "vocabulary":
      return "bg-vocabulary"
  }
}

function getTypeTextClass(type: ReviewItem["type"]): string {
  switch (type) {
    case "radical":
      return "text-radical-foreground"
    case "kanji":
      return "text-kanji-foreground"
    case "vocabulary":
      return "text-vocabulary-foreground"
  }
}

function getTypeLabel(type: ReviewItem["type"]): string {
  switch (type) {
    case "radical":
      return "Radical"
    case "kanji":
      return "Kanji"
    case "vocabulary":
      return "Vocab"
  }
}

export function ReviewSummary({ results, onRetry, onGoHome }: ReviewSummaryProps) {
  const correctCount = results.filter((r) => r.correct).length
  const totalCount = results.length
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0

  // Group results by item
  const itemMap = new Map<string, AnswerResult[]>()
  for (const result of results) {
    const key = `${result.item.id}-${result.questionType}`
    if (!itemMap.has(key)) {
      itemMap.set(key, [])
    }
    itemMap.get(key)!.push(result)
  }

  const incorrectResults = results.filter((r) => !r.correct)

  // Summary color based on performance
  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-chart-1"
    if (percentage >= 50) return "text-chart-2"
    return "text-destructive"
  }

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excelente! Trabalho fantastico!"
    if (percentage >= 80) return "Muito bom! Continue assim!"
    if (percentage >= 60) return "Bom progresso. Continue praticando!"
    if (percentage >= 40) return "Precisa de mais pratica. Nao desista!"
    return "Continue estudando. A pratica leva a perfeicao!"
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      {/* Score card */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <div className={cn("text-7xl font-bold", getPerformanceColor())}>{percentage}%</div>
          <p className="text-lg text-foreground">{getPerformanceMessage()}</p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-chart-1" />
              {correctCount} corretas
            </span>
            <span className="flex items-center gap-1.5">
              <X className="h-4 w-4 text-destructive" />
              {totalCount - correctCount} incorretas
            </span>
            <span>{totalCount} total</span>
          </div>
        </CardContent>
      </Card>

      {/* Stats by type */}
      <div className="grid grid-cols-3 gap-3">
        {(["radical", "kanji", "vocabulary"] as const).map((type) => {
          const typeResults = results.filter((r) => r.item.type === type)
          const typeCorrect = typeResults.filter((r) => r.correct).length
          const typeTotal = typeResults.length
          const typePct = typeTotal > 0 ? Math.round((typeCorrect / typeTotal) * 100) : 0
          return (
            <Card key={type} className="border-border bg-card">
              <CardContent className="flex flex-col items-center gap-1 py-4">
                <span
                  className={cn(
                    "mb-1 rounded px-2 py-0.5 text-xs font-medium",
                    getTypeBgClass(type),
                    getTypeTextClass(type)
                  )}
                >
                  {getTypeLabel(type)}
                </span>
                <span className="text-xl font-bold text-foreground">{typePct}%</span>
                <span className="text-xs text-muted-foreground">
                  {typeCorrect}/{typeTotal}
                </span>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Incorrect items */}
      {incorrectResults.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-foreground">
              <X className="h-4 w-4 text-destructive" />
              Itens para Revisar ({incorrectResults.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              {incorrectResults.map((result, i) => (
                <div
                  key={`${result.item.id}-${result.questionType}-${i}`}
                  className="flex items-center gap-3 rounded-md bg-destructive/5 p-3"
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-lg font-bold",
                      getTypeBgClass(result.item.type),
                      getTypeTextClass(result.item.type)
                    )}
                  >
                    {result.item.character}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {result.questionType === "meaning" ? "Significado" : "Leitura"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Sua resposta:{" "}
                      <span className="text-destructive">{result.userAnswer || "(pulado)"}</span>
                      {" | "}
                      Correto:{" "}
                      <span className="text-chart-1">
                        {result.questionType === "meaning"
                          ? `${result.item.meaningPt} (${result.item.meaning})`
                          : result.item.readings.join(", ")}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <Button variant="outline" onClick={onGoHome} className="gap-2 bg-transparent">
          <Home className="h-4 w-4" />
          Voltar ao Painel
        </Button>
        <Button onClick={onRetry} className="gap-2">
          <RotateCcw className="h-4 w-4" />
          Revisar Novamente
        </Button>
      </div>
    </div>
  )
}
