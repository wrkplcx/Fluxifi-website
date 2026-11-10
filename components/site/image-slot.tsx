import fs from "node:fs"
import path from "node:path"

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "gif", "avif"]

function findImage(slot: string) {
  const dir = path.join(process.cwd(), "public", "images")
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${slot}.${ext}`))) return `/images/${slot}.${ext}`
  }
  return null
}

/**
 * Renders /public/images/<slot>.<ext> when uploaded; otherwise an empty labeled frame.
 */
export function ImageSlot({
  slot,
  alt,
  className = "",
  priority = false,
}: {
  slot: string
  alt: string
  className?: string
  priority?: boolean
}) {
  const src = findImage(slot)

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#111111] ${className}`}
    >
      {src ? (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 border border-dashed border-white/10 rounded-xl p-4 text-center"
        >
          <span className="text-xs font-mono text-[#F4A023]/70">{slot}</span>
          <span className="text-[11px] text-white/30">public/images/{slot}.jpg</span>
        </div>
      )}
    </div>
  )
}
