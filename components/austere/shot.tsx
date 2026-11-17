import fs from "node:fs"
import path from "node:path"
import type { ReactNode } from "react"
import { findImage } from "@/components/site/image-slot"

export function publicFileExists(file: string) {
  return fs.existsSync(path.join(process.cwd(), "public", file))
}

/** An uploaded image in a thin 1px frame, or the fallback (a labeled empty frame by default). */
export function Shot({
  slot,
  alt,
  fallback,
  priority = false,
  aspect = "aspect-[16/10]",
}: {
  slot: string
  alt: string
  fallback?: ReactNode
  priority?: boolean
  aspect?: string
}) {
  const src = findImage(slot)
  return (
    <div className={`relative w-full overflow-hidden border border-[#2A2A2A] bg-black ${aspect}`}>
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : fallback ? (
        <div className="absolute inset-0 p-6 md:p-10">{fallback}</div>
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center"
        >
          <span className="text-sm text-[#8C8C8C]">{slot}</span>
          <span className="text-xs text-[#5A5A5A]">public/images/{slot}.jpg</span>
        </div>
      )}
    </div>
  )
}
