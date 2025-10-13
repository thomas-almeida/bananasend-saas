"use client"

import { useUserStore } from "@/store/userStore";
import { useUserSessionSync } from "@/hooks/useUserSessionSync";

export default function Sent() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)

  function listRecipients(recipients: string) {
    return recipients.split(",")
  }

  return (
    <div>
      <h1>Enviados</h1>

      {userStore.user && (
        <div className="mt-4">
          {
            userStore?.user?.mails?.length! > 0 ? (
              <ul>
                {userStore?.user?.mails?.map((mail, index: number) => (
                  <div
                    key={index}
                    className="p-2 border border-gray-200 rounded my-1"
                  >
                    <p className="text-gray-500 text-xs">{mail?.messageId}</p>
                    <p className="font-bold">{mail?.subject}</p>
                    <p className="text-sm">Destinatários: {listRecipients(mail?.toAddress).length}</p>
                    <p className="text-sm">Enviado em: {mail?.sentAt?.toString()}</p>
                  </div>
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