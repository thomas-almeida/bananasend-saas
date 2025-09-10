
import Kpi from "../Kpi"

export default function Kpis() {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Kpi title="Envios" description="Newsletters que você enviou" value={10} unit="" />
      <Kpi title="Posts" description="Automatizados no LinkedIn" value={2} unit="" />
      <Kpi title="Destinatários" description="Tamanho da sua audiência atual" value={3} unit="" />
      <Kpi title="Visualizações" description="Visitas ao seu perifil público" value={5} unit="" />
    </div>
  )
}