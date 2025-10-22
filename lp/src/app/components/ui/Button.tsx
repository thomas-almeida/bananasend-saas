"use client"

import { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  bgColor?: string
  textColor?: string
  hoverBgColor?: string
  className?: string
  icon?: React.ReactNode
}

export default function Button({ value, bgColor, textColor, hoverBgColor, className, type = "submit", icon, ...props }: ButtonProps) {
  return (
    <>
      <button
        type={type}
        style={{
          backgroundColor: bgColor || "#2bb24a",
          color: textColor || "white",
          pointerEvents: props.disabled ? "none" : "auto"
        }}
        className={`p-1.5 rounded transition-colors cursor-pointer ${className} ${icon ? "flex items-center justify-center" : ""}`}
        {...props}
      >
        {props.disabled ? "Aguarde..." : value}
        {
          icon && (
            <span className="ml-2">
              {icon}
            </span>
          )
        }
      </button>
    </>
  )
}