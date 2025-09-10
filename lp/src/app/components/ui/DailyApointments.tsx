"use client";

import { useRef, useState } from "react";
import Suggestion from "./DailyApointments/Suggestion";

export default function DailyApointments() {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

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
              aria-label="Falar"
              className="flex items-center justify-center w-10 h-8 rounded bg-[#707270] text-white hover:opacity-90 transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M12 14a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v4a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V20H9v2h6v-2h-2v-2.08A7 7 0 0 0 19 11h-2Z" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Adicionar"
              className="flex items-center justify-center w-10 h-8 rounded bg-[#2bb24a] text-white hover:opacity-90 transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M9 7v4h8v2H9v4l-5-5 5-5z" />
              </svg>
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