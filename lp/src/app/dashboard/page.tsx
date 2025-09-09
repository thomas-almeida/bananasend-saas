
import WeekCalendar from "../components/ui/WeekCalendar"
import Bar from "../components/ui/Bar"
import Kpi from "../components/ui/Kpi"
import DailyApointments from "../components/ui/DailyApointments"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <WeekCalendar daysAmount={7} />
      <DailyApointments />
      <Bar />
      <div className="grid grid-cols-4 gap-2">
        <Kpi title="Envios" description="Newsletters que você enviou" value={10} unit="" />
        <Kpi title="Posts" description="Automatizados no LinkedIn" value={2} unit="" />
        <Kpi title="Destinatários" description="Tamanho da sua audiência atual" value={3} unit="" />
        <Kpi title="Visualizações" description="Visitas ao seu perifil público" value={5} unit="" />
      </div>
    </div>
  )
}