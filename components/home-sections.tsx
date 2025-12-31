"use client"

import { useEffect, useRef } from "react"
import styles from "./home-sections.module.css"
import { Wrench, Trophy, GraduationCap } from "lucide-react"
import { EventCard } from "@/components/event-card"
import { Button } from "@/components/ui/button"
import Link from "next/link" // add next/link import for client-side navigation

export function HomeSections() {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!rootRef.current) return
    const el = rootRef.current
    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-reveal]"))

    // IntersectionObserver to avoid heavy runtime animation libs
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add(styles.show)
        }
      },
      { threshold: 0.14, rootMargin: "0px 0px -10% 0px" },
    )

    items.forEach((i) => io.observe(i))
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className={styles.wrapper}>
      {/* Features */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle} data-reveal>
          What you’ll get
        </h2>
        <div className={styles.features} role="list">
          <article className={styles.card} data-reveal>
            <div className={styles.cardHead}>
              <Wrench aria-hidden className={styles.icon} />
              <h3 className={styles.cardTitle}>Hands-on Workshops</h3>
            </div>
            <p className={styles.cardText}>From embedded systems to AI—learn by building.</p>
          </article>

          <article className={styles.card} data-reveal>
            <div className={styles.cardHead}>
              <Trophy aria-hidden className={styles.icon} />
              <h3 className={styles.cardTitle}>Flagship Events</h3>
            </div>
            <p className={styles.cardText}>Compete, collaborate, and showcase your skills.</p>
          </article>

          <article className={styles.card} data-reveal>
            <div className={styles.cardHead}>
              <GraduationCap aria-hidden className={styles.icon} />
              <h3 className={styles.cardTitle}>Industry Mentorship</h3>
            </div>
            <p className={styles.cardText}>Guidance from experts to accelerate your growth.</p>
          </article>
        </div>
      </section>

      {/* Events */}






      <section className={styles.section}>
        <h2 className={styles.sectionTitle} data-reveal>
          Upcoming & Recent Events
        </h2>
        <div className={styles.eventsGrid}>
          <div className={styles.eventItem} data-reveal>
            <EventCard
              title="PITCH DECK"
              date="Sep 12, 2021"
              description="A 1-minute presentation competition to pitch new ideas to industry experts."
              imgAlt="ISA VIT Pune Pitch Deck Event Poster"
              imgUrl="https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/PITCH_DECK_12sep.jpeg"
            />
          </div>
          <div className={styles.eventItem} data-reveal>
            <EventCard
              title="INGENIOUS 2022"
              date="Apr 18, 2022"
              description="A 7-day intensive online workshop conducted by ISRO and IUCAA scientists."
              imgAlt="Oscilloscope with waveform"
              imgUrl="https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/Ingenious2.png"
            />
          </div>
          <div className={styles.eventItem} data-reveal>
            <EventCard
              title="Satellite Building Workshop"
              date="Feb 10, 2022 - Feb 28, 2022"
              description="A 7-day intensive online workshop conducted by ISRO and IUCAA scientists."
              imgAlt="Satellite Orbits presentation during online workshop"
              imgUrl="https://raw.githubusercontent.com/pikachu-byte/IMAGES/refs/heads/main/satellight_10feb.png"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.cta} aria-labelledby="cta-title">
        <div className={styles.ctaBox} data-reveal>
          <h2 id="cta-title" className={styles.ctaTitle}>
            Be part of ISA VIT Pune
          </h2>
          <p className={styles.ctaText}>Join our community to learn, build, and lead with like-minded innovators.</p>
          <div className={styles.ctaActions}>
            <Button asChild>
              <Link href="/events" aria-label="Explore events">
                Explore Events
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/contact" aria-label="Join ISA">
                Join ISA
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
