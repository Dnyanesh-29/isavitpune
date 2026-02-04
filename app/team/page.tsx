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
  { name: "Dnyanesh", role: "WEB DEV Head", img: "team/Dnyanesh_web1.jpg" },
  { name: "AATISH", role: "WEB DEV Head", img: "team/AATISH_web2.jpg" },
  { name: "JAYESH", role: "AIML Head", img: "team/JAYESH_AI2.jpg" },
  { name: "ATUL", role: "AIML Head", img: "team/ATUL_AI1.png" },
  { name: "NEIL", role: "Mech Head", img: "team/NEIL_mech1.jpg" },
  { name: "ADITYA", role: "MECH Head", img: "/team/ADITYA_mech2.jpg" },
  { name: "UTKARSH", role: "ROBOTICS Head", img: "/team/UTKARSH_R1.jpg" },
  { name: "JAY", role: "ROBOTICS Head", img: "/team/JAY_R2.jpg" },
  { name: "AMAN", role: "CSF Head", img: "/team/AMAN_CSF1.jpg" },
  { name: "member", role: "CSF Head", img: "/team/" },
  { name: "PALAK", role: "DATABASE Head", img: "/team/PALAK_P1.jpg" },
  { name: "SAI", role: "DATABASE Head", img: "/team/SAI_P2.jpeg" },
  { name: "YASH", role: "OPERATIONS Head", img: "/team/YASH_O1.jpg" },
  { name: "RITESH", role: "OPERATIONS Head", img: "/team/RITESH_O2.jpeg" },
  { name: "AYUSH", role: "OPERATIONS Head", img: "/team/AYUSH_O3.jpeg" },
  { name: "SWAPNIL", role: "FINANCE Head", img: "/team/SWAPNIL_F1.jpg" },
  { name: "YOGESH", role: "FINANCE Head", img: "/team/YOGESH_F2.jpg" },
  { name: "SANJAY", role: "SPONSERSHIP Head", img: "/team/SANJAY_S1.png" },

  { name: "RIYA", role: " Industry Relations Head", img: "/team/RIYA_I1.jpg" },
  { name: "PRANIT", role: "Industry Relations Head", img: "/team/PRANIT_I2.jpg" },
  { name: "ATHARVA", role: "Industry Relations Head", img: "/team/ATHARVA_I3.png" },

  { name: "SUSHANT", role: "MEDIA Head", img: "/team/SUSHANT_M1.jpg" },
  { name: "LAKSHIT", role: "MEDIA Head", img: "/team/LAKSHIT_M2.png" },
  { name: "NINAD", role: "MEDIA Head", img: "/team/NINAD_M3.jpg" },


  { name: "ARADHAY", role: "CYBERSECURITY Head", img: "/team/ARADHAY_C1.png" },
  { name: "VIBHA", role: "CYBERSECURITY Head", img: "/team/VIBHA_C2.jpg" },



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
          <div className={styles.titleContainer}>
            <h2 className={styles.sectionTitle}>Core Team</h2>
            <div className={styles.titleUnderline}></div>
          </div>
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
          <div className={styles.titleContainer}>
            <h2 className={styles.sectionTitle}>Heads</h2>
            <div className={styles.titleUnderline}></div>
          </div>
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
