import fs from "node:fs"
import path from "node:path"

const EXTENSIONS = ["webp", "jpg", "jpeg", "png", "gif", "avif"]

export function findImage(slot: string) {
  const dir = path.join(process.cwd(), "public", "images")
  for (const ext of EXTENSIONS) {
    if (fs.existsSync(path.join(dir, `${slot}.${ext}`))) return `/images/${slot}.${ext}`
  }
  return null
}

/**
 * Renders /public/images/<slot>.<ext> when uploaded; otherwise an empty labeled frame,
 * or nothing at all when `hideIfEmpty` is set.
 */
export function ImageSlot({
  slot,
  alt,
  className = "",
  priority = false,
  hideIfEmpty = false,
  frame = "rounded",
}: {
  slot: string
  alt: string
  className?: string
  priority?: boolean
  hideIfEmpty?: boolean
  frame?: "rounded" | "square" | "none"
}) {
  const src = findImage(slot)
  if (!src && hideIfEmpty) return null

  const frameClass =
    frame === "rounded"
      ? "rounded-xl border border-white/10"
      : frame === "square"
        ? "border border-white/15"
        : ""

  return (
    <div className={`relative overflow-hidden bg-[#11151B] ${frameClass} ${className}`}>
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
          className="absolute inset-0 flex flex-col items-center justify-center gap-1 p-4 text-center"
        >
          <span className="text-sm text-[#8A94A3]">{slot}</span>
          <span className="text-xs text-[#8A94A3]/60">public/images/{slot}.jpg</span>
        </div>
      )}
    </div>
  )
}
