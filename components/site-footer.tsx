import Link from "next/link"
import styles from "./site-footer.module.css"
import { Instagram, Linkedin } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandRow}>
          <span className={styles.badge} aria-hidden="true" />
          <strong>ISA VIT Pune</strong>
        </div>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/about">About</Link>
          <Link href="/events">Events</Link>
          <Link href="/team">Team</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <nav className={styles.social} aria-label="Social">
          <a
            href="https://www.linkedin.com/company/isa-vit-chapter/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/isa.vit_pune?igsh=aTY2ZGkzYnMzdnZj"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>
        </nav>
        <p className={styles.copy}>© {new Date().getFullYear()} ISA Student Section, VIT Pune</p>
      </div>
    </footer>
  )
}
