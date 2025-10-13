"use client"

import Input from "@/app/components/ui/Form/Input";
import Button from "@/app/components/ui/Button";
import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useUserStore } from "@/store/userStore"
import { useEffect, useState } from "react";
import { addRecipient } from "@/app/services/user/userService";

export default function Settings() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');

  useEffect(() => {
    if (userStore.user?.recipients) {
      setEmails(userStore.user.recipients);
    }
  }, [userStore.user]);

  async function addEmail() {
    if (currentEmail.trim() === '') return;
    setEmails([...emails, currentEmail.trim()]);
    setCurrentEmail('');

    await addRecipient({
      userId: userStore.user?.id ?? '',
      recipient: currentEmail.trim()
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      addEmail();
    }
  }

  return (
    <div>

      <h1 className="text-xl font-bold my-2">Configurações</h1>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold">Informações do usuário</h2>
        <p>{userStore.user?.username}</p>
        <p>{userStore.user?.email}</p>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold">Informações do onboarding</h2>
        <p>{userStore.user?.onboarding?.age}</p>
        <p>{userStore.user?.onboarding?.occupation}</p>
        <p>{userStore.user?.onboarding?.linkedinUrl}</p>
        <p>{userStore.user?.onboarding?.workspace}</p>
        <p>{userStore.user?.onboarding?.mail}</p>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold">Informações do plano</h2>
        <p>{userStore.user?.subscription}</p>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold">Destinatários</h2>
        <p>Adicione destinatários para receber suas newsletters e notificações</p>
        <div className="flex gap-2">
          <Input
            placeholder="Email do destinatário"
            type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            className="mt-2 border border-slate-200 p-2 rounded outline-none flex-1"
          />
          <Button
            value="Adicionar"
            className="mt-2"
            onClick={addEmail}
            type="button"
          />
        </div>
        {emails.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Emails adicionados:</h3>
            <ul className="bg-gray-50 p-3 rounded">
              {emails.map((email, index) => (
                <li key={index} className="py-1 flex justify-between items-center">
                  <span>{email}</span>
                  <button
                    onClick={() => setEmails(emails.filter((_, i) => i !== index))}
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  )
}