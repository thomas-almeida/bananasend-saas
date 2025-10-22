"use client"

import Input from "@/app/components/ui/Form/Input";
import Button from "@/app/components/ui/Button";
import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useUserStore } from "@/store/userStore"
import { useEffect, useState } from "react";
import { addRecipient, removeRecipient } from "@/app/services/user/userService";
import { updatePublicPage } from "@/app/services/user/userService";
import Link from "next/link";

export default function Settings() {
  useUserSessionSync();
  const userStore = useUserStore(state => state)
  const [emails, setEmails] = useState<string[]>([]);
  const [currentEmail, setCurrentEmail] = useState('');
  const [publicPage, setPublicPage] = useState({
    title: userStore.user?.publicPage?.title ?? '',
    description: userStore.user?.publicPage?.description ?? ''
  });
  const [isLoading, setIsLoading] = useState(false);

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

  async function removeEmail(email: string) {
    setEmails(emails.filter((e) => e !== email));

    await removeRecipient({
      userId: userStore.user?.id ?? '',
      recipient: email
    })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      addEmail();
    }
  }

  async function updatePage() {
    setIsLoading(true);
    await updatePublicPage({
      userId: userStore.user?.id ?? '',
      title: publicPage.title,
      description: publicPage.description
    });
    setIsLoading(false);
  }

  return (
    <div>

      <h1 className="text-xl font-bold my-2">Configurações</h1>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Informações do usuário</h2>
        <div className="grid grid-cols-2 gap-2">
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Nome:</b> {userStore.user?.username}</p>
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Email:</b> {userStore.user?.email}</p>
        </div>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Dados Pessoais</h2>
        <div className="grid grid-cols-2 gap-2">
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Idade:</b> {userStore.user?.onboarding?.age}</p>
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Profissão:</b> {userStore.user?.onboarding?.occupation}</p>
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Linkedin:</b> {userStore.user?.onboarding?.linkedinUrl}</p>
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Workspace:</b> {userStore.user?.onboarding?.workspace}</p>
          <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Seu Email BananaSend:</b> {userStore.user?.onboarding?.mail}</p>
        </div>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Informações do plano</h2>
        <p className="border p-1 px-2 py-2 border-slate-200 rounded-sm"><b className="font-semibold text-slate-500">Plano:</b> {userStore.user?.subscription}</p>
      </div>

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Destinatários</h2>
        <p>Adicione destinatários para receber suas newsletters e notificações. por enquanto, automaticamente você enviará para todos os destinatários adicionados.</p>
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
            <ul className="p-3 rounded border border-slate-200">
              {emails.map((email, index) => (
                <li key={index} className="py-1 flex justify-between items-center">
                  <div className="flex justify-start items-center gap-1">
                    <b className="text-slate-500 text-md bg-green-500 text-white capitalize p-0.5 w-7 rounded-full flex justify-center items-center">
                      {email.slice(0, 1)}
                    </b>
                    <span className="text-slate-700 p-0.5 lowercase">{email}</span>
                  </div>
                  <button
                    onClick={() => removeEmail(email)}
                    className="text-red-500 hover:text-red-700 cursor-pointer"
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

      <div className="my-2 border border-slate-200 p-2 rounded">
        <h2 className="text-lg font-bold mb-2">Página Pública</h2>
        <p className="p-1 py-2 border-slate-200 rounded-sm">Configure um título e uma descrição personalizada para atrair mais leitores para sua newsletter atráves do seu link de compartilhamento</p>

        <div className="flex flex-col gap-2 mt-2 border border-slate-200 p-2 rounded">
          <p className="text-sm font-semibold mx-2">Título da página</p>
          <Input
            placeholder="Título"
            type="text"
            value={publicPage.title}
            onChange={(e) => setPublicPage({ title: e.target.value, description: publicPage.description })}
            className="border border-slate-200 p-2 rounded outline-none flex-1 font-semibold text-slate-700"
          />
          <p className="text-sm font-semibold mx-2">Descrição da página</p>
          <Input
            placeholder="Descrição"
            type="text"
            value={publicPage.description}
            onChange={(e) => setPublicPage({ title: publicPage.title, description: e.target.value })}
            className="border border-slate-200 p-2 rounded outline-none flex-1 font-semibold text-slate-500"
          />
          <div className="flex justify-between gap-2">
            <Button
              value={isLoading ? 'Salvando...' : 'Salvar'}
              className="mt-2 w-full"
              onClick={() => updatePage()}
              type="button"
            />
            <Link
              href={`/subscribe/${userStore.user?.id}`}
              className="w-full"
            >
              <Button
                value="Ver página"
                className="mt-2 w-full"
                bgColor="#1e90ff"
                type="button"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}