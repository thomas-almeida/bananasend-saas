"use client"
import WeekCalendar from "../components/ui/WeekCalendar"
import Bar from "../components/ui/Bar"
import DailyApointments from "../components/ui/DailyApointments"
import Trends from "../components/ui/LinkedIn/Trends"
import Kpis from "../components/ui/KPI/Kpis"
import OnboardingForm from "../components/ui/Modal/form/OnboardingForm"
import PushNotification from "../components/ui/PushNotification"
import { getNotifications, readNotifications } from "@/app/services/user/userService"

import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useUserStore } from "@/store/userStore"
import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Notification } from "@/app/types/notification"

export default function DashboardClient() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)
  const [showNotification, setShowNotification] = useState(false);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("Notificação de teste");
  const [notificationType, setNotificationType] = useState("success" as "success" | "error" | "warning" | "info");
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  async function handleMarkNotificationAsRead(notificationId: string) {
    try {
      await readNotifications({
        userId: userStore.user?.id as string,
        notificationId: notificationId
      });
      
      // Remove the notification from the local state
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification._id !== notificationId)
      );
      
      setShowNotificationDropdown(false);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // You might want to show an error message to the user here
    }
  }


  useEffect(() => {
    async function getNotificationsInDashboard() {
      if (userStore.user?.id) {
        const notifications = await getNotifications(userStore.user.id);
        const newNotifications = notifications.notifications.filter((notification: any) => notification.read === false);
        console.log(notifications)
        setNotifications(newNotifications);
      }
    }
    getNotificationsInDashboard();
  }, [userStore.user]);

  return (
    <div className="flex flex-col gap-8">
      <div className="relative">
        <h1 className="text-2xl font-bold">Olá, {userStore.user?.username}</h1>
        <div className="absolute top-[-15px] right-0">
          <div
            className="p-1.5 border border-slate-100 rounded shadow cursor-pointer relative"
            onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
          >
            <Bell color={notifications.length > 0 ? "green" : "black"} />
            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
          {showNotificationDropdown && (
            <div
              className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50"
            >
              <div
                className="py-1"
              >
                {notifications.length > 0 ? (
                  notifications.map((notification: any, index: number) => (
                    <div
                      key={index}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                      onClick={() => handleMarkNotificationAsRead(notification?._id)}
                    >
                      <div className="font-medium">{notification.title}</div>
                      <div className="text-gray-500">{notification.message}</div>
                      <div className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Clique para marcar como lida</p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    Nenhuma notificação nova
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
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