"use client"

import { GoogleIcon } from "./GoogleIcon";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function GoogleButton() {
  const { data: session } = useSession()
  const [posted, setPosted] = useState(false)

  // When session exists (after Google login redirect), post user once
  useEffect(() => {
    const email = session?.user?.email
    const name = session?.user?.name
    if (!email || !name) return

    const key = `user_posted_${email}`
    if (typeof window === "undefined") return
    if (localStorage.getItem(key)) {
      setPosted(true)
      return
    }

    const doPost = async () => {
      try {
        const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL
        if (!baseURL) return
        const res = await fetch(`${baseURL}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, email }),
        })
        if (res.ok) {
          localStorage.setItem(key, "1")
          localStorage.setItem("session_user", JSON.stringify({ name, email }))
          setPosted(true)
        }
      } catch (e) {
        // Silently ignore; avoid breaking UX
        console.error("Failed to POST /users", e)
      }
    }

    // Only run once per email
    if (!posted) doPost()
  }, [session?.user?.email, session?.user?.name, posted])

  return (
    <button
      onClick={() => { signIn("google", { callbackUrl: "/" }) }}
      className={`cursor-pointer inline-flex items-center gap-2 rounded-sm bg-white border border-black/10 px-4 py-2 text-sm font-medium shadow-[0_1px_0_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow card-shadow ${session ? "pointer-events-none" : ""}`}
      disabled={session ? true : false}
    >

      {
        session ? (
          <>
            <p className="text-xs">
              {session.user?.name}, você é <b className="italic font-bold text-[#2bb24a] font-mono">f0d@!</b>
            </p>
          </>
        ) : (
          <>
            Entrar na Lista de Espera!
            <GoogleIcon className="size-4" />
          </>
        )
      }
    </button>
  )
}