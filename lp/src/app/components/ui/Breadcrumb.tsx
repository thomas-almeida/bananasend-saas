"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Breadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)

  return (
    <div className="flex items-center gap-1 text-neutral-600 mb-4">
      {segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const isLast = index === segments.length - 1
        return (
          <span key={href} className="flex items-center">
            {isLast ? (
              <span className="capitalize mr-2">{segment}</span>
            ) : (
              <Link
                href={href}
                className="capitalize mr-2 hover:text-slate-800 hover:bg-slate-200 cursor-pointer"
              >
                {segment}
              </Link>
            )}
            {!isLast && <span className="mx-1 text-neutral-400">/</span>}
          </span>
        )
      })}
    </div>
  )
}