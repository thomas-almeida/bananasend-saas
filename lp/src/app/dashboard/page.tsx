import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import WeekCalendar from "../components/ui/WeekCalendar"
import Bar from "../components/ui/Bar"
import DailyApointments from "../components/ui/DailyApointments"
import Trends from "../components/ui/LinkedIn/Trends"
import Kpis from "../components/ui/KPI/Kpis"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect("/")
  }
  return (
    <div className="flex flex-col gap-8">
      <WeekCalendar daysAmount={7} />
      <Kpis />
      <DailyApointments />
      <Trends />
      <Bar />
    </div>
  )
}