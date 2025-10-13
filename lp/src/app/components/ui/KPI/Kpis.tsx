
import Kpi from "../Kpi"
import { UserData } from "@/app/types/userData"

interface KpisProps {
  userData: UserData | undefined
}

export default function Kpis({ userData }: KpisProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Kpi title="Envios" description="Newsletters que você enviou" value={userData?.mails?.length ?? 0} unit="" />
      <Kpi title="Destinatários" description="Tamanho da sua audiência atual" value={userData?.recipients?.length ?? 0} unit="" />
    </div>
  )
}