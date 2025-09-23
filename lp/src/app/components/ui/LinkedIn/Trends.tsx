"use client"

import Button from "../Button"
import TrendLineDemo from "./charts/TrendLineDemo"
import { UserData } from "@/app/types/userData"

interface TrendsProps {
  userData?: UserData;
}

export default function Trends({ userData }: TrendsProps) {
  
  return (
    <div className="bg-[#fcfcfc] p-4 rounded">
      <h2 className="text-xl font-bold">Tendências do LinkedIn</h2>
      <div className="py-8 mt-8 relative">
        <TrendLineDemo />
        {
          userData?.onboarding?.linkedinUrl == null &&
          <div className="bg-black/75 backdrop-blur-xs rounded text-center absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-center text-white">
            <p className="text-xl text-center w-[450px]">Conecte seu perfil do LinkedIn para começar a ver as tendências personalizadas do seu nicho e da sua profissão.</p>
            <Button
              value="Abrir Configurações"
              className="mt-6 py-2 px-4"
            />
          </div>
        }
      </div>
    </div>
  )
}
