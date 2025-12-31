"use client"

import type React from "react"
import { Mail, MapPin, Clock } from "lucide-react"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import styles from "./contact.module.css"
import { useState } from "react"

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("sending")
    setTimeout(() => setStatus("sent"), 900)
  }

  return (
    <>
      <SiteNavbar solidBackground />
      <main className={styles.main}>
        <PageHeader
          title="Get in Touch"
          subtitle="Questions, collaborations, or membership—drop us a message and we’ll get back to you."
          ctas={false}
        />
        <section className={styles.gridWrap} aria-label="Contact section">
          <div className={styles.formWrap} aria-label="Contact form">
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required placeholder="Your full name" />
              </div>
              <div className={styles.row}>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" required placeholder="you@example.com" />
              </div>
              <div className={styles.row}>
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Tell us how we can help" />
              </div>
              <button type="submit" className={styles.submit} disabled={status !== "idle"} aria-live="polite">
                {status === "idle" && "Send Message"}
                {status === "sending" && "Sending..."}
                {status === "sent" && "Sent! ✅"}
              </button>
            </form>
          </div>

          <aside className={styles.infoPanel} aria-label="Contact details">
            <h3>Contact Details</h3>
            <ul className={styles.infoList}>
              <li>
                <Mail aria-hidden="true" size={18} />
                <a href="mailto:contact@isa-vitpune.org">contact@isa-vitpune.org</a>
              </li>
              <li>
                <MapPin aria-hidden="true" size={18} />
                <span>VIT Pune, 666 University Road, Pune 411037</span>
              </li>
              <li>
                <Clock aria-hidden="true" size={18} />
                <span>Mon–Fri, 10:00–18:00 IST</span>
              </li>
            </ul>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
