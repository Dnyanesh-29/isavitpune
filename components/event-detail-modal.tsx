"use client"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X } from "lucide-react"
import type { EventItem } from "@/lib/events-data"

export function EventDetailModal({
  event,
  open,
  onOpenChange,
}: {
  event: EventItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!event) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 gap-0 rounded-2xl shadow-2xl border-0">
        {/* Close button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-4 right-4 z-50 rounded-full bg-white/90 hover:bg-white p-2 transition-all duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 text-gray-900" />
        </button>

        {/* Scrollable content container */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Event header with image */}
          <div className="relative w-full h-80 md:h-96 overflow-hidden">
            <Image src={event.imgUrl || "/placeholder.svg"} alt={event.imgAlt} fill priority className="object-cover" />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white"></div>
          </div>

          {/* Event content */}
          <div className="relative -mt-12 bg-white rounded-t-3xl pt-8 px-6 md:px-10 lg:px-14 pb-10">
            {/* Date badge */}
            <div className="inline-block mb-4">
              <p className="text-xs tracking-widest uppercase font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                {event.date}
              </p>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900 text-pretty leading-tight">
              {event.title}
            </h2>

            {/* Divider */}
            <div className="mt-6 w-12 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>

            {/* Description */}
            <p className="mt-8 text-base leading-relaxed text-gray-600">{event.longDescription}</p>

            {/* Close hint */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500">Click outside or press ESC to close</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
