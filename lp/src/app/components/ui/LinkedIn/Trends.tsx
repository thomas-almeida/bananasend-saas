"use client"

import TrendLineDemo from "./charts/TrendLineDemo"

export default function Trends() {
  return (
    <div className="bg-[#fcfcfc] p-4 rounded">
      <h2 className="text-xl font-bold">Tendências do LinkedIn</h2>
      <p className="text-sm text-slate-600">Veja quais assuntos de carreira do seu nicho estão em alta, entre nas dicussões você também!</p>

      <div className="py-4 mt-8">
        <TrendLineDemo />
      </div>
    </div>
  )
}
