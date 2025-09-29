"use client"

import Image from "next/image"
import { UserData } from "@/app/types/userData"

interface BarProps {
  userData?: UserData
}

export default function Bar({ userData }: BarProps) {

  const percentage = userData?.progress?.currentPoints
  console.log(userData)

  return (
    <div className="my-4 bg-slate-50 p-4 rounded shadow">
      <h3 className="text-xl">Amadurecimento Semanal</h3>
      <p className="text-sm text-slate-600 ">Adicione atualizações chave do seu dia para aumentar seu nível e desbloquear novos templates e mais formas de criar engajamento com sua liderança</p>
      <div className="flex items-center shadow-lg rounded-md w-full bg-slate-200 my-2">
        <div className="flex items-center gap-2 bg-[#2bb24a] rounded-full px-2 p-0.5 relative" style={{ width: `${percentage}%` }}>
          <p className="text-xs italic text-white font-bold">{percentage}%</p>
          <Image
            src="/img/pointer-bg.png"
            alt="send"
            width={45}
            height={45}
            className="absolute right-0 rounded hover:rotate-12 transition-all cursor-pointer"
            priority
          />
        </div>
      </div>
    </div>
  )
}