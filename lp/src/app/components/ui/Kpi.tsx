"use client"

interface KpiProps {
  title: string,
  description: string,
  value: number,
  unit: string
}

export default function Kpi({ title, description, value, unit }: KpiProps) {
  return (
    <div className="flex items-center gap-2 border border-slate-200 p-6 rounded">
      <div>
        <h2 className="text-2xl font-bold">{value}{unit}</h2>
        <h3 className="text-sm">{title}</h3>
        <p className="text-xs text-slate-600">{description}</p>
      </div>
    </div>
  )
}