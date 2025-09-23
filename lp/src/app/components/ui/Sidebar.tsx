"use client"

import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useSession } from "next-auth/react"
import { sidebarOptions } from "../../utils/sidebar-options"
import { useUserStore } from "@/store/userStore"
import { useUserSessionSync } from "@/hooks/useUserSessionSync"

export default function Sidebar() {
  const { data: session } = useSession()
  useUserSessionSync();
  const user = useUserStore(state => state)
  console.log(user);

  return (
    <div className="w-48 p-4 font-mono sticky top-0 h-dvh bg-white border-r border-slate-200 shrink-0">
      <Image
        src="/img/bananasend-logo.png"
        alt="send"
        width={80}
        height={80}
        className="rounded pb-4"
        priority
      />
      <div>
        <Button
          value="Criar +"
          className="w-full mb-4"
          onClick={() => { }}
        />
      </div>
      <ul>
        {
          sidebarOptions.map((option, index) => (
            <li key={index}>
              <Link
                href={option.href}
              >
                <p className="p-1.5 hover:text-slate-800 hover:bg-slate-200 cursor-pointer">{option.name}</p>
              </Link>
            </li>
          ))
        }
      </ul>
      <div className="absolute bottom-4 flex justify-between gap-1 items-center">
        <div>
          {

            session?.user?.image &&
            <Image
              src={session?.user?.image!}
              alt="profile-picture"
              width={30}
              height={30}
              priority
              className="rounded"
            />
            
            }
        </div>
        <div>
          <p className="text-sm">{session?.user?.name}</p>
          <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap text-slate-600 max-w-[120px]">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  )
}