"use client"
import WeekCalendar from "../components/ui/WeekCalendar"
import Bar from "../components/ui/Bar"
import DailyApointments from "../components/ui/DailyApointments"
import Trends from "../components/ui/LinkedIn/Trends"
import Kpis from "../components/ui/KPI/Kpis"
import OnboardingForm from "../components/ui/Modal/form/OnboardingForm"
import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useUserStore } from "@/store/userStore"

export default function DashboardClient() {
  useUserSessionSync();
  const user = useUserStore(state => state)
  console.log(user);

  return (
    <div className="flex flex-col gap-8">
      <WeekCalendar daysAmount={7} />
      <Kpis />
      <DailyApointments />
      <Trends userData={user.user ?? undefined} />
      <Bar />
      {user.user && <OnboardingForm userData={user.user} />}
    </div>
  )
}