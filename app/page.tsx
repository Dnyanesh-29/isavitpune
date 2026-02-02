import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { HomeSections } from "@/components/home-sections"
import { GPUParticleBackground } from "@/components/gpu-particle-background"
import styles from "./home.module.css"

export default function HomePage() {
  return (
    <>
      <SiteNavbar variant="fixed" enableScrollAnimation />
      <main className={styles.main}>
        <section className={styles.hero}>
          <GPUParticleBackground />
          <div className={styles.heroOverlay} aria-hidden />
          <div className={styles.heroInner}>
            <PageHeader
              title="Innovate. Learn. Lead."
              subtitle="ISA Student Section at VIT Pune fosters a vibrant community for electronics, automation, and tech enthusiasts through hands-on events, workshops, and competitions."
              invert
              useTypingEffect={true}
            />
          </div>
        </section>

        <HomeSections />
      </main>
      <SiteFooter />
    </>
  )
}
