"use client"
import WeekCalendar from "../components/ui/WeekCalendar"
import Bar from "../components/ui/Bar"
import DailyApointments from "../components/ui/DailyApointments"
import Trends from "../components/ui/LinkedIn/Trends"
import Kpis from "../components/ui/KPI/Kpis"
import OnboardingForm from "../components/ui/Modal/form/OnboardingForm"
import PushNotification from "../components/ui/PushNotification"

import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useUserStore } from "@/store/userStore"
import { useState } from "react"


export default function DashboardClient() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("Notificação de teste");
  const [notificationType, setNotificationType] = useState("success" as "success" | "error" | "warning" | "info");

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">Olá, {userStore.user?.username}</h1>
      <WeekCalendar
        daysAmount={7}
      />
      <Kpis userData={userStore.user ?? undefined} />
      <DailyApointments
        userData={userStore.user ?? undefined}
        setShowNotification={setShowNotification}
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
      <Trends
        userData={userStore.user ?? undefined}
      />
      <Bar userData={userStore.user ?? undefined} />
      {userStore.user && <OnboardingForm userData={userStore.user} />}
      {showNotification && (
        <PushNotification
          message={notificationMessage}
          type={notificationType}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  )
}