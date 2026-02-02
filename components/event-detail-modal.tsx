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
      {/* Increased modal width from 95vw to 70vw on desktop for larger, more impressive display */}
      <DialogContent className="!max-w-[70vw] w-[70vw] max-h-[95vh] overflow-hidden p-0 gap-0 rounded-3xl shadow-2xl border-0 bg-white">
        {/* Close button with enhanced styling */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 rounded-full bg-white/95 hover:bg-white hover:scale-110 p-3 transition-all duration-200 shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-900" />
        </button>

        {/* Scrollable content container */}
        <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent">
          {/* Event header with image - larger and more dramatic */}
          <div className="relative w-full h-96 md:h-[500px] overflow-hidden group">
            <Image
              src={event.imgUrl || "/placeholder.svg"}
              alt={event.imgAlt}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Enhanced gradient overlay with blue accent */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/30"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-transparent"></div>
          </div>

          {/* Event content with improved spacing and typography */}
          <div className="relative bg-white px-8 md:px-14 lg:px-16 py-12 md:py-16">
            {/* Date badge - redesigned */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
              <p className="text-sm tracking-widest uppercase font-semibold text-blue-600">{event.date}</p>
            </div>

            {/* Title - larger and more impactful */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 text-pretty leading-tight mb-8">
              {event.title}
            </h2>

            {/* Enhanced divider */}
            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mb-10"></div>

            {/* Description with better typography */}
            <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mb-12">{event.longDescription}</p>

            <div className="mt-14 pt-10 border-t-2 border-gray-100">
              <div className="flex flex-wrap gap-8">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Event Type</p>
                  <p className="text-lg font-semibold text-gray-900">Workshop & Competition</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-2">Organized By</p>
                  <p className="text-lg font-semibold text-gray-900">ISA VIT Pune</p>
                </div>
              </div>
            </div>

            {/* Close hint */}
            <div className="mt-12 text-center pb-4">
              <p className="text-xs text-gray-400">Click outside or press ESC to close</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
