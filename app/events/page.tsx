"use client"

import { useState } from "react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import { EventCard } from "@/components/event-card"
import { EventDetailModal } from "@/components/event-detail-modal"
import styles from "./events.module.css"
import { events, type EventItem } from "@/lib/events-data"

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleEventClick = (event: EventItem) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }

  return (
    <>
      <SiteNavbar solidBackground />
      <main className={styles.main}>
        <PageHeader
          title="Events & Workshops"
          subtitle="Explore our lineup of technical events—talks, hackathons, bootcamps, and more."
          ctas={false}
        />
        <AnimatedSection className={styles.grid}>
          {events.map((e) => (
            <EventCard key={e.slug} {...e} onOpen={() => handleEventClick(e)} />
          ))}
        </AnimatedSection>
      </main>

      <EventDetailModal event={selectedEvent} open={modalOpen} onOpenChange={setModalOpen} />

      <SiteFooter />
    </>
  )
}
