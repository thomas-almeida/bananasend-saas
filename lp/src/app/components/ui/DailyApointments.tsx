"use client";

import { useRef, useState } from "react";
import Suggestion from "./DailyApointments/Suggestion";
import { IoMdAdd } from "react-icons/io";
import { addDailyAction } from "../../services/user/userService";
import { UserData } from "@/app/types/userData";

interface TrendsProps {
  userData?: UserData;
  setShowNotification: (show: boolean) => void;
  setNotificationMessage: (message: string) => void;
  setNotificationType: (type: "success" | "error" | "warning" | "info") => void;
}

export default function DailyApointments({ userData, setShowNotification, setNotificationMessage, setNotificationType }: TrendsProps) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleShowNotification() {
    setShowNotification(true)
    setNotificationMessage("Ação adicionada com sucesso")
    setNotificationType("success")
  }

  async function handleAdd() {
    setLoading(true)

    await addDailyAction({
      userId: userData?.id ?? "",
      action: text
    })

    setLoading(false)
    setText("")
    inputRef.current?.focus()
    handleShowNotification()
  }

  return (
    <div className="border border-slate-200 p-4 rounded shadow">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setOpen(v => !v)}
      >
        <h3 className="font-semibold">Hoje: {new Date().toLocaleDateString()}</h3>
        <button
          type="button"
          aria-expanded={open}
          aria-label={open ? "Ocultar" : "Mostrar"}
          className="cursor-pointer flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={`w-6 h-6 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`}
          >
            <path d="M19 9a1 1 0 0 0-1.7-.7L12 13.59 6.7 8.3A1 1 0 0 0 5.3 9.7l6 6a1 1 0 0 0 1.4 0l6-6c.2-.18.3-.43.3-.7Z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className=" border border-slate-200 p-2 rounded text-sm my-2">
          <span className="flex justify-between items-center gap-2 mb-6">
            <input
              ref={inputRef}
              type="text"
              placeholder="Escrever..."
              className="outline-none w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              type="button"
              aria-label="Adicionar"
              className="flex items-center justify-center gap-2 px-4 h-8 rounded bg-[#2bb24a] text-white hover:opacity-90 transition cursor-pointer"
              onClick={handleAdd}
              disabled={loading}
            >
              <p>{loading ? "Enviando..." : "Adicionar"}</p>
              <IoMdAdd />
            </button>
          </span>

          <div className="text-xs flex  flex-wrap justify-start items-center gap-2">
            <Suggestion suggestion="🗓️ Daily sobre semana passada" onSelect={(s) => { setText(s); inputRef.current?.focus() }} />
            <Suggestion suggestion="👨🏻‍💻 Reunião com cliente para quebrar objeções" onSelect={(s) => { setText(s); inputRef.current?.focus() }} />
            <Suggestion suggestion="🎯 Meta atingida" onSelect={(s) => { setText(s); inputRef.current?.focus() }} />
            <Suggestion suggestion="📞 X Novos chamados resolvidos" onSelect={(s) => { setText(s); inputRef.current?.focus() }} />
            <Suggestion suggestion="✅ X Tarefas concluídas" onSelect={(s) => { setText(s); inputRef.current?.focus() }} />
          </div>
        </div>
      )}
    </div>
  )
}