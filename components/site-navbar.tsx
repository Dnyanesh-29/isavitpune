"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import styles from "./site-navbar.module.css"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
]

interface SiteNavbarProps {
  variant?: "fixed" | "sticky"
  enableScrollAnimation?: boolean
  solidBackground?: boolean
}

export function SiteNavbar({
  variant = "sticky",
  enableScrollAnimation = false,
  solidBackground = false,
}: SiteNavbarProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isNonHomePage = pathname !== "/"
  const shouldHaveSolidBg = solidBackground || isNonHomePage

  useEffect(() => {
    const prev = document.body.style.overflow
    if (open) document.body.style.overflow = "hidden"
    else document.body.style.overflow = prev || ""
    return () => {
      document.body.style.overflow = prev || ""
    }
  }, [open])

  useEffect(() => {
    if (!enableScrollAnimation) {
      setScrolled(shouldHaveSolidBg)
      return
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [enableScrollAnimation, shouldHaveSolidBg])

  return (
    <header className={cn(styles.header, scrolled && styles.scrolled, variant === "fixed" && styles.fixed)}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="ISA VIT Pune Home" onClick={() => setOpen(false)}>
          <Image src="/images/isa-logo.png" width={28} height={28} alt="ISA logo" className={styles.logoImg} priority />
          <span className="text-pretty">ISA VIT Pune</span>
        </Link>

        <nav className={cn(styles.nav)} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink}>
              <span>{l.label}</span>
              <span className={styles.underline} aria-hidden="true" />
            </Link>
          ))}
        </nav>

        <button
          className={cn(styles.burger, open && styles.burgerOpen)}
          aria-label={open ? "Close Menu" : "Open Menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
          <span className={styles.burgerBar} />
        </button>
      </div>

      <nav
        id="mobile-menu"
        className={cn(styles.fullscreenMenu, open && styles.fullscreenMenuOpen)}
        aria-label="Mobile"
      >
        <div className={styles.menuLinks}>
          {links.map((l, index) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.fullscreenLink}
              style={{ animationDelay: `${index * 80}ms` }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
