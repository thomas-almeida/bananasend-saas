"use client"

import Image from "next/image"
import Link from "next/link"

interface KpiProps {
  title: string,
  description: string,
  value: number,
  unit: string,
  image?: string,
  imageClassName?: string,
  link?: string,
  linkText?: string
}

export default function Kpi({ title, description, value, unit, image, imageClassName, link, linkText }: KpiProps) {
  return (
    <div className="group grid grid-cols-2 justify-between items-center gap-2 border border-slate-200 p-6 rounded hover:shadow-md transition-all duration-300">
      <div>
        <h2 className="text-2xl font-bold">{value}{unit}</h2>
        <h3 className="text-lg">{title}</h3>
        <p className="text-xs text-slate-600">{description}</p>
        {
          link &&
          <Link href={link} target="_blank" className="text-blue-500 text-sm hover:underline">{linkText}</Link>
        }
      </div>
      <div className="flex justify-end">
        {
          image &&
          <div className="transition-transform duration-300 group-hover:rotate-4">
            <Image
              src={image}
              alt={title}
              width={100}
              height={100}
              className={`transition-all duration-300 ${imageClassName}`}
            />
          </div>
        }
      </div>
    </div>
  )
}