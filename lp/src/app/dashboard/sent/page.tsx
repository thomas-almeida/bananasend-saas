"use client"

import { useUserStore } from "@/store/userStore";
import { useUserSessionSync } from "@/hooks/useUserSessionSync";

export default function Sent() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)

  return (
    <div>
      <h1>Enviados</h1>

      {userStore.user && (
        <div className="mt-4">
          {
            userStore?.user?.mails?.length! > 0 ? (
              <ul>
                {userStore?.user?.mails?.map((mail) => (
                  <li key={mail}>{mail}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Nenhum email enviado ainda</p>
            )
          }
        </div>
      )}
    </div>
  )
}