
import Kpi from "../Kpi"

export default function Kpis() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <Kpi title="Envios" description="Newsletters que você enviou" value={0} unit="" />
      <Kpi title="Posts" description="Automatizados no LinkedIn" value={0} unit="" />
      <Kpi title="Destinatários" description="Tamanho da sua audiência atual" value={0} unit="" />
    </div>
  )
}