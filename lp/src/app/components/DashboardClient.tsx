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
  const userStore = useUserStore(state => state)
  return (
    <div className="flex flex-col gap-8">
      <WeekCalendar daysAmount={7} />
      <Kpis />
      <DailyApointments />
      <Trends userData={userStore.user ?? undefined} />
      <Bar />
      {userStore.user && <OnboardingForm userData={userStore.user} />}
    </div>
  )
}