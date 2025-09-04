"use client"

import { useEffect, useState } from "react"

interface ModalProps {
  title: string
  description?: string
  children?: React.ReactNode
  onClose?: () => void
}

export function Modal({ title, description, children, onClose }: ModalProps) {
  const [open, setOpen] = useState(true)
  const [visible, setVisible] = useState(false)

  // Trigger fade-in on mount
  useEffect(() => {
    setVisible(true)
  }, [])

  if (!open) return null

  return (
    <div
      className={
        `fixed inset-0 z-50 overflow-y-auto font-mono transition-opacity duration-200 ease-out ` +
        (visible ? "bg-black/55 opacity-100" : "bg-black/55 opacity-0")
      }
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className={
          `p-6 rounded transition-opacity duration-200 ease-out ` +
          (visible ? "opacity-100" : "opacity-0")
        }>
          <span className="text-center flex flex-col justify-center items-center w-full">
            <h3 className="text-xl mb-2 text-white">{title}</h3>
            <span className="w-[80%] mx-auto">
              <p className="text-xs">{description}</p>
            </span>
            {children}
            <div className="flex justify-center items-center mt-4">
              <button
                className="bg-[#2bb24a] text-white px-4 py-2 rounded hover:bg-[#2bb24a]/80 transition-colors cursor-pointer w-full md:w-[400px]"
                onClick={() => { onClose?.(); setOpen(false) }}
                aria-label="Fechar modal"
              >
                Fechar
              </button>
            </div>
          </span>
        </div>
      </div>
    </div>
  )
}