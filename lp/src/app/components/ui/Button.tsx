"use client"

import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  bgColor?: string
  textColor?: string
  hoverBgColor?: string
  className?: string
}
  
export default function Button({ value, bgColor, textColor, hoverBgColor, className, type = "submit", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      style={{
        backgroundColor: bgColor || "#2bb24a",
        color: textColor || "white",
      }}
      className={`p-1.5 rounded transition-colors cursor-pointer ${className}`}
      {...props}
    >
      {value}
    </button>
  )
}