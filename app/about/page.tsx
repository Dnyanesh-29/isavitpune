import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { PageHeader } from "@/components/page-header"
import { AnimatedSection } from "@/components/animated-section"
import styles from "./about.module.css"

export default function AboutPage() {
  return (
    <>
      <SiteNavbar solidBackground />
      <main className={styles.main}>
        <PageHeader
          title="About ISA VIT Pune"
          subtitle="We are a student-led community advancing instrumentation, automation, and technology through learning by doing."
          ctas={false}
        />
        <AnimatedSection className={styles.timelineWrap}>
          <ol className={styles.timeline} aria-label="ISA milestones">
            <li>
              <div className={styles.dot} />
              <div>
                <h3>Founded</h3>
                <p>ISA VIT Pune began as a passionate group of tech enthusiasts.</p>
              </div>
            </li>
            <li>
              <div className={styles.dot} />
              <div>
                <h3>First Flagship</h3>
                <p>Hosted our first large-scale symposium with 300+ participants.</p>
              </div>
            </li>
            <li>
              <div className={styles.dot} />
              <div>
                <h3>Growing Impact</h3>
                <p>Expanded to workshops, hackathons, and industry mentorships.</p>
              </div>
            </li>
          </ol>
        </AnimatedSection>
      </main>
      <SiteFooter />
    </>
  )
}
