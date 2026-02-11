"use client"

import { useState, useCallback } from "react"
import { generateLessonBatch, type LessonItem } from "@/lib/data"
import { LessonSession } from "@/components/lesson-session"

export default function LessonsPage() {
  const [items, setItems] = useState<LessonItem[]>(() => generateLessonBatch())
  const [sessionKey, setSessionKey] = useState(0)

  const handleRestart = useCallback(() => {
    setItems(generateLessonBatch())
    setSessionKey((prev) => prev + 1)
  }, [])

  return <LessonSession key={sessionKey} items={items} onRestart={handleRestart} />
}
