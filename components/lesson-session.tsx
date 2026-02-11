"use client"

import React, { useState, useCallback, useRef, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  SkipForward,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { LessonItem, ReviewQuestionType } from "@/lib/data"
import { getTierForLevel } from "@/lib/data"

// ---- Helper functions ----
function getTypeLabel(type: LessonItem["type"]): string {
  switch (type) {
    case "radical":
      return "Radical"
    case "kanji":
      return "Kanji"
    case "vocabulary":
      return "Vocabulario"
  }
}

function getTypeBgClass(type: LessonItem["type"]): string {
  switch (type) {
    case "radical":
      return "bg-radical"
    case "kanji":
      return "bg-kanji"
    case "vocabulary":
      return "bg-vocabulary"
  }
}

function getTypeTextClass(type: LessonItem["type"]): string {
  switch (type) {
    case "radical":
      return "text-radical-foreground"
    case "kanji":
      return "text-kanji-foreground"
    case "vocabulary":
      return "text-vocabulary-foreground"
  }
}

function getTypeColorClass(type: LessonItem["type"]): string {
  switch (type) {
    case "radical":
      return "text-radical"
    case "kanji":
      return "text-kanji"
    case "vocabulary":
      return "text-vocabulary"
  }
}

function getTypeBorderClass(type: LessonItem["type"]): string {
  switch (type) {
    case "radical":
      return "border-radical/30"
    case "kanji":
      return "border-kanji/30"
    case "vocabulary":
      return "border-vocabulary/30"
  }
}

// ---- Quiz types ----
interface QuizQuestion {
  item: LessonItem
  questionType: ReviewQuestionType
}

interface QuizResult {
  item: LessonItem
  questionType: ReviewQuestionType
  userAnswer: string
  correct: boolean
}

// ==============================
// Learning Phase Component
// ==============================
function LearningPhase({
  items,
  currentIndex,
  onNext,
  onPrev,
  onFinishLearning,
}: {
  items: LessonItem[]
  currentIndex: number
  onNext: () => void
  onPrev: () => void
  onFinishLearning: () => void
}) {
  const item = items[currentIndex]
  const tier = getTierForLevel(item.level)
  const isLast = currentIndex === items.length - 1
  const isFirst = currentIndex === 0
  const progressPercent = Math.round(((currentIndex + 1) / items.length) * 100)

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Progress bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center gap-4">
          <BookOpen className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-muted-foreground">
            Aprendendo {currentIndex + 1} / {items.length}
          </span>
          <Progress value={progressPercent} className="h-2 flex-1" />
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-4 py-8">
        {/* Character header */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge
              className={cn(
                getTypeBgClass(item.type),
                getTypeTextClass(item.type),
              )}
            >
              {getTypeLabel(item.type)}
            </Badge>
            <Badge
              style={{ backgroundColor: tier.bgColor, color: tier.textColor }}
            >
              Nivel {item.level}
            </Badge>
          </div>

          <div
            className={cn(
              "flex h-28 w-28 items-center justify-center rounded-2xl text-5xl font-bold sm:h-36 sm:w-36 sm:text-7xl",
              getTypeBgClass(item.type),
              getTypeTextClass(item.type),
            )}
          >
            {item.character}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">{item.meaningPt}</h2>
            <p className="text-muted-foreground">{item.meaning}</p>
          </div>
        </div>

        {/* Readings (kanji / vocabulary only) */}
        {item.readings.length > 0 && (
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">Leituras</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {item.readings.map((r) => (
                  <span
                    key={r}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm font-medium",
                      item.type === "kanji"
                        ? "bg-kanji/10 text-kanji"
                        : "bg-vocabulary/10 text-vocabulary",
                    )}
                  >
                    {r}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mnemonic - Meaning */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-foreground">
              {item.type === "radical" ? "Mnemonico" : "Mnemonico de Significado"}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Portugues
              </p>
              <p className="leading-relaxed text-foreground">{item.mnemonicPt}</p>
            </div>
            <Separator />
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Ingles
              </p>
              <p className="leading-relaxed text-muted-foreground">{item.mnemonic}</p>
            </div>
          </CardContent>
        </Card>

        {/* Mnemonic - Reading (kanji / vocabulary only) */}
        {item.readingMnemonicPt && (
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">
                Mnemonico de Leitura
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Portugues
                </p>
                <p className="leading-relaxed text-foreground">{item.readingMnemonicPt}</p>
              </div>
              <Separator />
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Ingles
                </p>
                <p className="leading-relaxed text-muted-foreground">{item.readingMnemonic}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Related items */}
        {item.relatedItems.length > 0 && (
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-foreground">
                {item.type === "radical"
                  ? "Encontrado nos Kanji"
                  : item.type === "kanji"
                    ? "Composicao de Radicais"
                    : "Kanji Relacionados"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {item.relatedItems.map((ri) => (
                  <div
                    key={ri.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border bg-secondary p-3",
                      getTypeBorderClass(item.type),
                    )}
                  >
                    <span className={cn("text-lg font-bold", getTypeColorClass(item.type))}>
                      {ri.character}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{ri.labelPt}</p>
                      <p className="text-xs text-muted-foreground">{ri.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Bottom navigation */}
      <div className="sticky bottom-0 border-t border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Button
            variant="ghost"
            onClick={onPrev}
            disabled={isFirst}
            className="gap-2 text-muted-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Anterior
          </Button>

          {/* Item pips */}
          <div className="flex items-center gap-1.5">
            {items.map((it, i) => (
              <div
                key={it.id}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors",
                  i === currentIndex
                    ? "bg-primary"
                    : i < currentIndex
                      ? "bg-primary/40"
                      : "bg-muted-foreground/20",
                )}
              />
            ))}
          </div>

          {isLast ? (
            <Button onClick={onFinishLearning} className="gap-2">
              Iniciar Quiz
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={onNext} className="gap-2">
              Proximo
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// ==============================
// Quiz Phase Component
// ==============================
function QuizPhase({
  items,
  onComplete,
}: {
  items: LessonItem[]
  onComplete: (results: QuizResult[]) => void
}) {
  const [questions] = useState<QuizQuestion[]>(() => {
    const qs: QuizQuestion[] = []
    for (const item of items) {
      qs.push({ item, questionType: "meaning" })
      if (item.type !== "radical" && item.readings.length > 0) {
        qs.push({ item, questionType: "reading" })
      }
    }
    return qs.sort(() => Math.random() - 0.5)
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [results, setResults] = useState<QuizResult[]>([])
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "incorrect">("idle")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [shakeKey, setShakeKey] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentQ = questions[currentIndex]
  const progressPercent =
    questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0

  useEffect(() => {
    if (answerState === "idle" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [answerState, currentIndex])

  const checkAnswer = useCallback(() => {
    if (!currentQ || !userInput.trim()) return

    const answer = userInput.trim().toLowerCase()
    let isCorrect = false

    if (currentQ.questionType === "meaning") {
      isCorrect = currentQ.item.meaningAlternatives.some(
        (alt) => alt === answer || alt.includes(answer) || answer.includes(alt),
      )
    } else {
      isCorrect = currentQ.item.readings.some((r) => r === userInput.trim())
    }

    const result: QuizResult = {
      item: currentQ.item,
      questionType: currentQ.questionType,
      userAnswer: userInput.trim(),
      correct: isCorrect,
    }

    setResults((prev) => [...prev, result])

    if (isCorrect) {
      setAnswerState("correct")
    } else {
      setAnswerState("incorrect")
      if (currentQ.questionType === "meaning") {
        setCorrectAnswer(`${currentQ.item.meaningPt} (${currentQ.item.meaning})`)
      } else {
        setCorrectAnswer(currentQ.item.readings.join(", "))
      }
      setShakeKey((prev) => prev + 1)
    }
  }, [currentQ, userInput])

  const handleNext = useCallback(() => {
    setUserInput("")
    setAnswerState("idle")
    setCorrectAnswer("")

    if (currentIndex + 1 >= questions.length) {
      onComplete(results)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }, [currentIndex, questions.length, onComplete, results])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        if (answerState === "idle") {
          checkAnswer()
        } else {
          handleNext()
        }
      }
    },
    [answerState, checkAnswer, handleNext],
  )

  if (!currentQ) return null

  const isMeaning = currentQ.questionType === "meaning"

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Progress bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
            Quiz
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
          <Progress value={progressPercent} className="h-2 flex-1" />
          <span className="text-sm font-medium text-muted-foreground">{progressPercent}%</span>
        </div>
      </div>

      {/* Main quiz area */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
        <div className="flex flex-col items-center gap-4">
          <span
            className={cn(
              "rounded-md px-2.5 py-0.5 text-xs font-medium",
              getTypeBgClass(currentQ.item.type),
              getTypeTextClass(currentQ.item.type),
            )}
          >
            {getTypeLabel(currentQ.item.type)}
          </span>

          <div
            className={cn(
              "flex h-28 w-28 items-center justify-center rounded-2xl text-5xl font-bold sm:h-40 sm:w-40 sm:text-7xl",
              getTypeBgClass(currentQ.item.type),
              getTypeTextClass(currentQ.item.type),
            )}
          >
            {currentQ.item.character}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-lg font-semibold text-foreground">
            {isMeaning ? "Significado" : "Leitura"}
          </span>
          <span className="text-sm text-muted-foreground">
            {isMeaning
              ? "Digite o significado em portugues ou ingles"
              : "Digite a leitura em hiragana"}
          </span>
        </div>

        <div className="w-full max-w-md">
          <div key={shakeKey} className={cn(answerState === "incorrect" && "animate-shake")}>
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isMeaning ? "Resposta..." : "こたえ..."}
              disabled={answerState !== "idle"}
              className={cn(
                "h-14 text-center text-lg font-medium",
                answerState === "correct" && "border-chart-1 bg-chart-1/10 text-chart-1",
                answerState === "incorrect" &&
                  "border-destructive bg-destructive/10 text-destructive",
              )}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {answerState !== "idle" && (
            <div
              className={cn(
                "mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium",
                answerState === "correct"
                  ? "bg-chart-1/10 text-chart-1"
                  : "bg-destructive/10 text-destructive",
              )}
            >
              {answerState === "correct" ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Correto!</span>
                </>
              ) : (
                <>
                  <X className="h-5 w-5" />
                  <span>
                    Incorreto. Resposta: <strong>{correctAnswer}</strong>
                  </span>
                </>
              )}
            </div>
          )}

          <div className="mt-6 flex justify-center gap-3">
            {answerState === "idle" ? (
              <>
                <Button
                  onClick={checkAnswer}
                  disabled={!userInput.trim()}
                  className="h-12 gap-2 px-8"
                >
                  Verificar
                  <Check className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setResults((prev) => [
                      ...prev,
                      {
                        item: currentQ.item,
                        questionType: currentQ.questionType,
                        userAnswer: "",
                        correct: false,
                      },
                    ])
                    handleNext()
                  }}
                  className="h-12 gap-2 text-muted-foreground"
                >
                  Pular
                  <SkipForward className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button onClick={handleNext} className="h-12 gap-2 px-8">
                {currentIndex + 1 >= questions.length ? "Ver Resultado" : "Proximo"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-border bg-card/50 px-4 py-2">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-xs text-muted-foreground">
          <span>Quiz da Licao</span>
          <span>
            Pressione{" "}
            <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">
              Enter
            </kbd>{" "}
            para confirmar
          </span>
        </div>
      </div>
    </div>
  )
}

// ==============================
// Lesson Summary Component
// ==============================
function LessonSummary({
  items,
  quizResults,
  onRetry,
  onGoHome,
}: {
  items: LessonItem[]
  quizResults: QuizResult[]
  onRetry: () => void
  onGoHome: () => void
}) {
  const correctCount = quizResults.filter((r) => r.correct).length
  const totalCount = quizResults.length
  const percentage = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0
  const incorrectResults = quizResults.filter((r) => !r.correct)

  const getPerformanceColor = () => {
    if (percentage >= 80) return "text-chart-1"
    if (percentage >= 50) return "text-chart-2"
    return "text-destructive"
  }

  const getPerformanceMessage = () => {
    if (percentage >= 90) return "Excelente! Voce aprendeu muito bem!"
    if (percentage >= 80) return "Muito bom! Bom progresso!"
    if (percentage >= 60) return "Bom! Continue praticando."
    if (percentage >= 40) return "Precisa revisar mais. Nao desista!"
    return "Tente estudar novamente. A pratica leva a perfeicao!"
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
      {/* Score card */}
      <Card className="border-border bg-card">
        <CardContent className="flex flex-col items-center gap-4 py-10">
          <p className="text-sm font-medium text-muted-foreground">Resultado da Licao</p>
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
          </div>
        </CardContent>
      </Card>

      {/* Items learned */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-sm text-foreground">
            Itens Aprendidos ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-2 rounded-lg border border-border bg-secondary p-3"
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-md text-lg font-bold",
                    getTypeBgClass(item.type),
                    getTypeTextClass(item.type),
                  )}
                >
                  {item.character}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.meaningPt}</p>
                  <p className="text-xs text-muted-foreground">{item.meaning}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Incorrect */}
      {incorrectResults.length > 0 && (
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm text-foreground">
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
                      getTypeTextClass(result.item.type),
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
                      <span className="text-destructive">
                        {result.userAnswer || "(pulado)"}
                      </span>
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
        <Link href="/dashboard">
          <Button variant="outline" className="gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Painel
          </Button>
        </Link>
        <Button onClick={onRetry} className="gap-2">
          Nova Licao
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

// ==============================
// Main Lesson Session
// ==============================
export interface LessonSessionProps {
  items: LessonItem[]
  onRestart: () => void
}

export function LessonSession({ items, onRestart }: LessonSessionProps) {
  const [phase, setPhase] = useState<"learning" | "quiz" | "summary">("learning")
  const [learningIndex, setLearningIndex] = useState(0)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])

  const handleNextLearning = useCallback(() => {
    setLearningIndex((prev) => Math.min(prev + 1, items.length - 1))
  }, [items.length])

  const handlePrevLearning = useCallback(() => {
    setLearningIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  const handleFinishLearning = useCallback(() => {
    setPhase("quiz")
  }, [])

  const handleQuizComplete = useCallback((results: QuizResult[]) => {
    setQuizResults(results)
    setPhase("summary")
  }, [])

  const handleRetry = useCallback(() => {
    onRestart()
  }, [onRestart])

  if (phase === "learning") {
    return (
      <LearningPhase
        items={items}
        currentIndex={learningIndex}
        onNext={handleNextLearning}
        onPrev={handlePrevLearning}
        onFinishLearning={handleFinishLearning}
      />
    )
  }

  if (phase === "quiz") {
    return <QuizPhase items={items} onComplete={handleQuizComplete} />
  }

  return (
    <LessonSummary
      items={items}
      quizResults={quizResults}
      onRetry={handleRetry}
      onGoHome={() => {}}
    />
  )
}
