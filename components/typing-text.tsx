"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  backSpeed?: number
  backDelay?: number
  startDelay?: number
  loop?: boolean
}

export function TypingText({
  text,
  className = "",
  speed = 50,
  backSpeed = 30,
  backDelay = 1000,
  startDelay = 0,
  loop = false,
}: TypingTextProps) {
  const elementRef = useRef<HTMLSpanElement>(null)
  const typedRef = useRef<Typed | null>(null)

  useEffect(() => {
    if (!elementRef.current) return

    typedRef.current = new Typed(elementRef.current, {
      strings: [text],
      typeSpeed: speed,
      backSpeed: backSpeed,
      backDelay: backDelay,
      startDelay: startDelay,
      loop: loop,
      showCursor: false,
    })

    return () => {
      typedRef.current?.destroy()
    }
  }, [text, speed, backSpeed, backDelay, startDelay, loop])

  return <span ref={elementRef} className={className} />
}
