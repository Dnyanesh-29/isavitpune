"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import styles from "./animated-section.module.css"

export function AnimatedSection({
  children,
  as: Tag = "section",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  as?: any
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={[styles.section, visible ? styles.in : "", className].join(" ")}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
