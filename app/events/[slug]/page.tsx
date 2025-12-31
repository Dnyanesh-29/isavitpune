import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { SiteNavbar } from "@/components/site-navbar"
import { SiteFooter } from "@/components/site-footer"
import { getEventBySlug } from "@/lib/events-data"

export default function EventDetailsPage({
  params,
}: {
  params: { slug: string }
}) {
  const event = getEventBySlug(params.slug)
  if (!event) return notFound()

  return (
    <>
      <SiteNavbar variant="sticky" enableScrollAnimation={true} solidBackground={true} />
      <main className="container mx-auto px-4 py-10 md:py-16">
        <div className="mb-6">
          <Link href="/events" className="text-sm underline hover:no-underline text-muted-foreground">
            ← Back to Events
          </Link>
        </div>

        <article className="rounded-2xl border bg-card text-card-foreground shadow">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Text side */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase text-muted-foreground">{event.date}</p>
              <h1 className="mt-2 text-3xl md:text-4xl font-semibold text-pretty">{event.title}</h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">{event.longDescription}</p>
              <div className="mt-6 flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-primary-foreground hover:opacity-90 transition"
                >
                  Register Interest
                </Link>
                <Link href="/events" className="inline-flex items-center justify-center rounded-md border px-4 py-2">
                  View All Events
                </Link>
              </div>
            </div>

            {/* Image side */}
            <div className="relative min-h-[260px] md:min-h-[420px] rounded-b-2xl md:rounded-b-none md:rounded-r-2xl overflow-hidden">
              <Image
                src={event.imgUrl || "/placeholder.svg"}
                alt={event.imgAlt}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  )
}
