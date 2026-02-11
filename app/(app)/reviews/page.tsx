"use client"

import { useState, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation"
import { generateReviewQueue } from "@/lib/data"
import type { ReviewItem, ReviewQuestionType } from "@/lib/data"
import { ReviewSession } from "@/components/review-session"
import { ReviewSummary } from "@/components/review-summary"

interface AnswerResult {
  item: ReviewItem
  questionType: ReviewQuestionType
  userAnswer: string
  correct: boolean
}

type Phase = "session" | "summary"

export default function ReviewsPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("session")
  const [reviewItems, setReviewItems] = useState(() => generateReviewQueue())
  const [sessionResults, setSessionResults] = useState<AnswerResult[]>([])

  const handleComplete = useCallback((results: AnswerResult[]) => {
    setSessionResults(results)
    setPhase("summary")
  }, [])

  const handleRetry = useCallback(() => {
    setReviewItems(generateReviewQueue())
    setSessionResults([])
    setPhase("session")
  }, [])

  const handleGoHome = useCallback(() => {
    router.push("/dashboard")
  }, [router])

  if (phase === "summary") {
    return (
      <ReviewSummary
        results={sessionResults}
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    )
  }

  return <ReviewSession items={reviewItems} onComplete={handleComplete} />
}
