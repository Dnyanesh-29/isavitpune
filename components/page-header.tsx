"use client"

import styles from "./page-header.module.css"
import { motion } from "framer-motion"
import Link from "next/link"

export function PageHeader({
  title,
  subtitle,
  ctas = true,
  invert = false,
  className = "",
}: {
  title: string
  subtitle: string
  ctas?: boolean
  invert?: boolean
  className?: string
}) {
  const words = title.split(" ")
  return (
    <div className={`${styles.wrap} ${invert ? styles.invert : ""} ${className}`}>
      <motion.h1
        className={`${styles.title} text-balance`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-20% 0% -10% 0%" }}
        variants={{
          hidden: { opacity: 1 },
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {words.map((w, i) => (
          <motion.span
            key={i}
            className={styles.titleWord}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.65, 0.2, 1] } },
            }}
          >
            {w}{" "}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className={`${styles.subtitle} text-pretty`}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {subtitle}
      </motion.p>

      {ctas && (
        <motion.div
          className={`${styles.ctas} ${invert ? styles.ctasInvert : ""}`}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/events" className={`${styles.primaryBtn} ${invert ? styles.primaryBtnInvert : ""}`}>
            Explore Events
          </Link>
          <Link href="/contact" className={`${styles.secondaryBtn} ${invert ? styles.secondaryBtnInvert : ""}`}>
            Join ISA
          </Link>
        </motion.div>
      )}
    </div>
  )
}
