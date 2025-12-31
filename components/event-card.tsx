"use client"

import styles from "./event-card.module.css"
import Image from "next/image"
import { motion } from "framer-motion"

export function EventCard({
  title,
  date,
  description,
  imgAlt,
  imgUrl,
  onOpen,
}: {
  title: string
  date: string
  description: string
  imgAlt: string
  imgUrl: string
  onOpen?: () => void
}) {
  const Article = (
    <motion.article
      className={styles.card}
      whileHover={{ y: -4, rotateX: 2, rotateY: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      aria-label={title}
    >
      <div className={styles.media}>
        <Image
          src={imgUrl || "/placeholder.svg?height=320&width=480&query=event-poster"}
          alt={imgAlt}
          fill
          className={styles.image}
          sizes="(min-width: 768px) 320px, 100vw"
          priority={false}
        />
        <span className={styles.mediaGlow} aria-hidden="true" />
      </div>
      <div className={styles.body}>
        <h3 className="text-pretty">{title}</h3>
        <p className={styles.meta}>{date}</p>
        <p className={styles.desc}>{description}</p>
      </div>
    </motion.article>
  )

  if (onOpen) {
    return (
      <button
        onClick={onOpen}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl w-full text-left"
      >
        {Article}
      </button>
    )
  }

  return Article
}
