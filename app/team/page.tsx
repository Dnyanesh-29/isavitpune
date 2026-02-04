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

const departments = [
  {
    name: "Web Development",
    members: [
      { name: "Dnyanesh", role: "Head", img: "team/Dnyanesh_web1.jpg" },
      { name: "AATISH", role: "Head", img: "team/AATISH_web2.jpg" },
    ]
  },
  {
    name: "AI & Machine Learning",
    members: [
      { name: "JAYESH", role: "Head", img: "team/JAYESH_AI2.jpg" },
      { name: "ATUL", role: "Head", img: "team/ATUL_AI1.png" },
    ]
  },
  {
    name: "Mechanical Engineering",
    members: [
      { name: "NEIL", role: "Head", img: "team/NEIL_mech1.jpg" },
      { name: "ADITYA", role: "Head", img: "/team/ADITYA_mech2.jpg" },
    ]
  },
  {
    name: "Robotics",
    members: [
      { name: "UTKARSH", role: "Head", img: "/team/UTKARSH_R1.jpg" },
      { name: "JAY", role: "Head", img: "/team/JAY_R2.jpg" },
    ]
  },
  {
    name: "Cyber Security",
    members: [
      { name: "AMAN", role: "Head", img: "/team/AMAN_CSF1.jpg" },
    ]
  },
  {
    name: "Database",
    members: [
      { name: "PALAK", role: "Head", img: "/team/PALAK_P1.jpg" },
      { name: "SAI", role: "Head", img: "/team/SAI_P2.jpeg" },
    ]
  },
  {
    name: "Operations",
    members: [
      { name: "YASH", role: "Head", img: "/team/YASH_O1.jpg" },
      { name: "RITESH", role: "Head", img: "/team/RITESH_O2.jpeg" },
      { name: "AYUSH", role: "Head", img: "/team/AYUSH_O3.jpeg" },
    ]
  },
  {
    name: "Finance",
    members: [
      { name: "SWAPNIL", role: "Head", img: "/team/SWAPNIL_F1.jpg" },
      { name: "YOGESH", role: "Head", img: "/team/YOGESH_F2.jpg" },
    ]
  },
  {
    name: "Sponsorship",
    members: [
      { name: "SANJAY", role: "Head", img: "/team/SANJAY_S1.png" },
    ]
  },
  {
    name: "Industry Relations",
    members: [
      { name: "RIYA", role: "Head", img: "/team/RIYA_I1.jpg" },
      { name: "PRANIT", role: "Head", img: "/team/PRANIT_I2.jpg" },
      { name: "ATHARVA", role: "Head", img: "/team/ATHARVA_I3.png" },
    ]
  },
  {
    name: "Media",
    members: [
      { name: "SUSHANT", role: "Head", img: "/team/SUSHANT_M1.jpg" },
      { name: "LAKSHIT", role: "Head", img: "/team/LAKSHIT_M2.png" },
      { name: "NINAD", role: "Head", img: "/team/NINAD_M3.jpg" },
    ]
  },
  {
    name: "Cyber Security",
    members: [
      { name: "ARADHAY", role: "Head", img: "/team/ARADHAY_C1.png" },
      { name: "VIBHA", role: "Head", img: "/team/VIBHA_C2.jpg" },
    ]
  },
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
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
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
            <h2 className={styles.sectionTitle}>Department Heads</h2>
            <div className={styles.titleUnderline}></div>
          </div>
          <div className={styles.departmentsContainer}>
            {departments.map((dept, deptIdx) => (
              <motion.div
                key={dept.name}
                className={styles.departmentSection}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: deptIdx * 0.05, duration: 0.5 }}
              >
                <h3 className={styles.departmentTitle}>{dept.name}</h3>
                <div className={styles.departmentGrid}>
                  {dept.members.map((member, idx) => (
                    <motion.article
                      key={`${dept.name}-${member.name}`}
                      className={styles.card}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05, duration: 0.4 }}
                    >
                      <div className={styles.avatarWrap}>
                        <Image
                          src={member.img || "/placeholder.svg"}
                          alt={`${member.name} - ${member.role}`}
                          fill
                          className={styles.avatar}
                          sizes="(min-width: 768px) 200px, 100vw"
                        />
                      </div>
                      <div className={styles.meta}>
                        <h4>{member.name}</h4>
                        <p>{member.role}</p>
                      </div>
                    </motion.article>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
