"use client"

import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { motion } from "framer-motion"
import Image from "next/image"
import styles from "./team.module.css"

const coreTeam = [
  { name: "Member 1", role: "President", img: "/core-president.jpg" },
  { name: "Member 2", role: "Vice President", img: "/core-vp.jpg" },
  { name: "Member 3", role: "General Secretary", img: "/core-gs.jpg" },
  { name: "Member 4", role: "Treasurer", img: "/core-treasurer.jpg" },
]
const heads = [
  { name: "Member 5", role: "Tech Head", img: "/head-tech.jpg" },
  { name: "Member 6", role: "Events Head", img: "/head-events.jpg" },
  { name: "Member 7", role: "Outreach Head", img: "/ARADHAY_KOPULWAR_cyber.jpg" },
  { name: "Member 8", role: "Design Head", img: "/head-design.jpg" },
  { name: "Member 9", role: "PR Head", img: "/head-pr.jpg" },
  { name: "Member 10", role: "Logistics Head", img: "https://drive.google.com/u/0/drive-viewer/AKGpihYCtNG4h0YgWA0XyLRUKniSveTAfGG-W9rDmCsJrup-XGWrRcNMW9TrCjjVEQXgM5FTe6mo_KgSq2s1KZ4maN8k1_5egIk6Cg=s1600-rw-v1?auditContext=forDisplay" },
]

export default function TeamPage() {
  return (
    <>
      <SiteNavbar solidBackground />
      <main className={styles.main}>
        <PageHeader
          title="Meet Our Team"
          subtitle="A diverse group of builders, designers, and organizers powering ISA VIT Pune."
          ctas={false}
        />
        <section className={styles.section} aria-label="Core Team">
          <h2 className={styles.sectionTitle}>Core Team</h2>
          <div className={styles.grid}>
            {coreTeam.map((m, idx) => (
              <motion.article
                key={m.name}
                className={styles.card}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                <div className={styles.avatarWrap}>
                  <Image
                    src={m.img || "/placeholder.svg"}
                    alt={`${m.name} - ${m.role}`}
                    fill
                    className={styles.avatar}
                    sizes="(min-width: 768px) 250px, 100vw"
                  />
                </div>
                <div className={styles.meta}>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-label="Department Heads">
          <h2 className={styles.sectionTitle}>Heads</h2>
          <div className={styles.gridHeads}>
            {heads.map((m, idx) => (
              <motion.article
                key={m.name}
                className={styles.card}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
              >
                <div className={styles.avatarWrap}>
                  <Image
                    src={m.img || "/placeholder.svg"}
                    alt={`${m.name} - ${m.role}`}
                    fill
                    className={styles.avatar}
                    sizes="(min-width: 768px) 250px, 100vw"
                  />
                </div>
                <div className={styles.meta}>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
