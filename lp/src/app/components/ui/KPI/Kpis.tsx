
import Kpi from "../Kpi"
import { UserData } from "@/app/types/userData"

interface KpisProps {
  userData: UserData | undefined
}

export default function Kpis({ userData }: KpisProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Kpi
        title="Envios"
        description="Newsletters que você enviou"
        value={userData?.mails?.length ?? 0}
        unit=""
        image="/icons/mail.png"
        imageClassName="w-24 h-24 rotate-4"
      />
      <Kpi
        title="Leitores"
        description="Tamanho da sua audiência atual"
        value={userData?.recipients?.length ?? 0}
        unit=""
        image="/icons/person.png"
        imageClassName="w-28 h-28"
        link={`/subscribe/${userData?.id}`}
        linkText="Compartilhe sua Newsletter!"
      />
    </div>
  )
}