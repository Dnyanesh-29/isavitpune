"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import styles from "./features-carousel.module.css"
import { ChevronUp } from "lucide-react"
import { memo } from "react"

const features = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop",
    title: "Hands-on Workshops",
    description:
      "From embedded systems to AI—learn by building practical projects with hands-on experience and real-world applications.",
  },
  {
    id: 2,
    image: "https://varioproductions.com/wp-content/uploads/2020/02/5-Event-Tech-Trends-to-Watch-Out-For-in-2020-scaled-1-1024x683.jpg",
    title: "Flagship Events",
    description:
      "Compete, collaborate, and showcase your skills in our signature competitions and networking events designed for excellence.",
  },
  {
    id: 3,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz5X5G_MQzqTkjLQDhvGBsa89oWR10WKA0pw&s",
    title: "Industry Mentorship",
    description:
      "Guidance from experts to accelerate your growth through personalized mentorship and career development opportunities.",
  },
]

const CarouselCard = memo(({ feature, isActive, offset, styles: styleModule }: any) => {
  const translateValue = offset * 110
  return (
    <div
      className={`${styleModule.card} ${isActive ? styleModule.cardActive : ''}`}
      style={{
        transform: `translateX(calc(${translateValue}% + ${offset * 20}px)) scale(${isActive ? 1 : 0.85})`,
        opacity: isActive ? 1 : 0.5,
      }}
    >
      <img src={feature.image || "/placeholder.svg"} alt={feature.title} className={styleModule.cardImage} loading="lazy" />
      <h3 className={styleModule.cardTitle}>{feature.title}</h3>
      <p className={styleModule.cardDescription}>{feature.description}</p>
    </div>
  )
})

CarouselCard.displayName = 'CarouselCard'

export function FeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)
  const autoScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoScroll = () => {
    if (autoScrollTimeoutRef.current) {
      clearTimeout(autoScrollTimeoutRef.current)
    }
    autoScrollTimeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % features.length)
    startAutoScroll()
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
    startAutoScroll()
  }

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index)
    startAutoScroll()
  }

  useEffect(() => {
    startAutoScroll()
    return () => {
      if (autoScrollTimeoutRef.current) {
        clearTimeout(autoScrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={styles.carouselSection}>
      <h2 className={styles.sectionTitle}>What you'll get</h2>

      <div className={styles.carouselContainer}>
        <button className={styles.navButton} onClick={handlePrev} aria-label="Previous feature">
          <ChevronUp size={24} style={{ transform: "rotate(-90deg)" }} />
        </button>

        <div className={styles.cardsTrack}>
          {features.map((feature, index) => {
            const isActive = index === activeIndex
            const offset = index - activeIndex

            return (
              <article
                key={feature.id}
                className={`${styles.card} ${isActive ? styles.active : ""}`}
                style={{
                  transform: `translateX(${offset * 100}%) scale(${isActive ? 1 : 0.75})`,
                  opacity: Math.abs(offset) > 1 ? 0 : 1,
                }}
              >
                <div className={styles.cardImage}>
                  <img src={feature.image || "/placeholder.svg"} alt={feature.title} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>
              </article>
            )
          })}
        </div>

        <button className={styles.navButton} onClick={handleNext} aria-label="Next feature">
          <ChevronUp size={24} style={{ transform: "rotate(90deg)" }} />
        </button>
      </div>

      {/* Indicators below navigation */}
      <div className={styles.indicators}>
        {features.map((_, index) => (
          <button
            key={index}
            className={`${styles.indicator} ${activeIndex === index ? styles.indicatorActive : ""}`}
            aria-label={`Go to feature ${index + 1}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  )
}
