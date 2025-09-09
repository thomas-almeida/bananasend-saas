"use client"

import Button from "./Button"

export default function PlanBanner() {
  return (
    <div className="flex justify-between items-center gap-1 bg-amber-50 px-4 py-2 sticky top-0 z-20 shadow-sm">
      <div>
        <h2 className="text-md font-bold">Você está no modo Gratuito</h2>
        <p className="text-xs text-slate-600">Escolha um de nossos planos para desbloquear mais funcionalidades e continuar criando relatórios e newsletters para construir audiência e engajamento com sua liderança</p>
      </div>
      <Button
        value="Ver Planos"
        className="text-sm w-[200px] my-2"
      />
    </div>
  )
}