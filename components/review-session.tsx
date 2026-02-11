"use client"

import React from "react"

import { useState, useCallback, useRef, useEffect } from "react"
import { Check, X, ArrowRight, SkipForward } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import type {
  ReviewItem,
  ReviewQuestionType,
} from "@/lib/data"
import { getSrsStageInfo } from "@/lib/data"

interface ReviewQuestion {
  item: ReviewItem
  questionType: ReviewQuestionType
}

interface AnswerResult {
  item: ReviewItem
  questionType: ReviewQuestionType
  userAnswer: string
  correct: boolean
}

interface ReviewSessionProps {
  items: ReviewItem[]
  onComplete: (results: AnswerResult[]) => void
}

function buildQuestionQueue(items: ReviewItem[]): ReviewQuestion[] {
  const questions: ReviewQuestion[] = []
  for (const item of items) {
    questions.push({ item, questionType: "meaning" })
    if (item.type !== "radical" && item.readings.length > 0) {
      questions.push({ item, questionType: "reading" })
    }
  }
  return questions.sort(() => Math.random() - 0.5)
}

function getTypeLabel(type: ReviewItem["type"]): string {
  switch (type) {
    case "radical":
      return "Radical"
    case "kanji":
      return "Kanji"
    case "vocabulary":
      return "Vocabulario"
  }
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

export function ReviewSession({ items, onComplete }: ReviewSessionProps) {
  const [questions] = useState(() => buildQuestionQueue(items))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [results, setResults] = useState<AnswerResult[]>([])
  const [answerState, setAnswerState] = useState<"idle" | "correct" | "incorrect">("idle")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [shakeKey, setShakeKey] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentQuestion = questions[currentIndex]
  const progressPercent = questions.length > 0 ? Math.round((currentIndex / questions.length) * 100) : 0

  useEffect(() => {
    if (answerState === "idle" && inputRef.current) {
      inputRef.current.focus()
    }
  }, [answerState, currentIndex])

  const checkAnswer = useCallback(() => {
    if (!currentQuestion || !userInput.trim()) return

    const answer = userInput.trim().toLowerCase()
    let isCorrect = false

    if (currentQuestion.questionType === "meaning") {
      isCorrect = currentQuestion.item.meaningAlternatives.some(
        (alt) => alt === answer || alt.includes(answer) || answer.includes(alt)
      )
    } else {
      isCorrect = currentQuestion.item.readings.some((r) => r === userInput.trim())
    }

    const result: AnswerResult = {
      item: currentQuestion.item,
      questionType: currentQuestion.questionType,
      userAnswer: userInput.trim(),
      correct: isCorrect,
    }

    setResults((prev) => [...prev, result])

    if (isCorrect) {
      setAnswerState("correct")
    } else {
      setAnswerState("incorrect")
      if (currentQuestion.questionType === "meaning") {
        setCorrectAnswer(`${currentQuestion.item.meaningPt} (${currentQuestion.item.meaning})`)
      } else {
        setCorrectAnswer(currentQuestion.item.readings.join(", "))
      }
      setShakeKey((prev) => prev + 1)
    }
  }, [currentQuestion, userInput])

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
    [answerState, checkAnswer, handleNext]
  )

  if (!currentQuestion) {
    return null
  }

  const srsInfo = getSrsStageInfo(currentQuestion.item.srsStage)
  const isMeaning = currentQuestion.questionType === "meaning"

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Progress bar */}
      <div className="border-b border-border bg-card px-4 py-3">
        <div className="mx-auto flex max-w-2xl items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            {currentIndex + 1} / {questions.length}
          </span>
          <Progress value={progressPercent} className="h-2 flex-1" />
          <span className="text-sm font-medium text-muted-foreground">{progressPercent}%</span>
        </div>
      </div>

      {/* Main quiz area */}
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
        {/* Character display */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-md px-2.5 py-0.5 text-xs font-medium",
                getTypeBgClass(currentQuestion.item.type),
                getTypeTextClass(currentQuestion.item.type)
              )}
            >
              {getTypeLabel(currentQuestion.item.type)}
            </span>
            <span
              className="rounded-md px-2.5 py-0.5 text-xs font-medium"
              style={{ backgroundColor: srsInfo.bgColor, color: srsInfo.textColor }}
            >
              {srsInfo.name}
            </span>
          </div>

          <div
            className={cn(
              "flex h-32 w-32 items-center justify-center rounded-2xl text-6xl font-bold sm:h-44 sm:w-44 sm:text-8xl",
              getTypeBgClass(currentQuestion.item.type),
              getTypeTextClass(currentQuestion.item.type)
            )}
          >
            {currentQuestion.item.character}
          </div>
        </div>

        {/* Question type label */}
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

        {/* Input area */}
        <div className="w-full max-w-md">
          <div
            key={shakeKey}
            className={cn(
              answerState === "incorrect" && "animate-shake"
            )}
          >
            <Input
              ref={inputRef}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isMeaning ? "Resposta..." : "こたえ..."}
              disabled={answerState !== "idle"}
              className={cn(
                "h-14 text-center text-lg font-medium",
                answerState === "correct" &&
                  "border-chart-1 bg-chart-1/10 text-chart-1",
                answerState === "incorrect" &&
                  "border-destructive bg-destructive/10 text-destructive"
              )}
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>

          {/* Answer feedback */}
          {answerState !== "idle" && (
            <div
              className={cn(
                "mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium",
                answerState === "correct"
                  ? "bg-chart-1/10 text-chart-1"
                  : "bg-destructive/10 text-destructive"
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

          {/* Action buttons */}
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
                        item: currentQuestion.item,
                        questionType: currentQuestion.questionType,
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

      {/* Bottom info bar */}
      <div className="border-t border-border bg-card/50 px-4 py-2">
        <div className="mx-auto flex max-w-2xl items-center justify-between text-xs text-muted-foreground">
          <span>Nivel {currentQuestion.item.level}</span>
          <span>
            Pressione <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-foreground">Enter</kbd> para confirmar
          </span>
        </div>
      </div>
    </div>
  )
}
