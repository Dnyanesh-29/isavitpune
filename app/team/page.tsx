"use client"

import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { motion } from "framer-motion"
import Image from "next/image"
import styles from "./team.module.css"

const coreTeam = [
  { name: "Member 1", role: "President", img: "/team/president.jpg" },
  { name: "Member 2", role: "Vice President", img: "/team/vice-president.jpg" },
  { name: "Member 3", role: "General Secretary", img: "/team/general-secretary.jpg" },
  { name: "Member 4", role: "Treasurer", img: "/team/treasurer.jpg" },
]
const heads = [
  { name: "Dnyanesh", role: "WEB DEV Head", img: "https://github.com/Dnyanesh-29/isavitpune/blob/main/public/images/Dnyanesh_web1.jpg?raw=true" },
  { name: "AATISH", role: "WEB DEV Head", img: "https://github.com/Dnyanesh-29/isavitpune/blob/main/public/images/AATISH%20_web2.JPG?raw=true" },
  { name: "JAYESH", role: "AIML Head", img: "https://github.com/Dnyanesh-29/isavitpune/blob/main/public/images/JAYESH_AI2.jpg?raw=true" },
  { name: "ATUL", role: "AIML Head", img: "https://github.com/Dnyanesh-29/isavitpune/blob/main/public/images/ATUL_AI1.png?raw=true" },
  { name: "Member 9", role: "PR Head", img: "/team/pr-head.jpg" },
  { name: "Member 10", role: "Logistics Head", img: "/team/ARADHAY_KOPULWAR_cyber.jpg" },
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
