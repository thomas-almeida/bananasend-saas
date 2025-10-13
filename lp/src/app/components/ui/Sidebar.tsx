"use client"

import { useState, useRef, useEffect } from 'react';
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"
import { useSession, signOut } from "next-auth/react"
import { sidebarOptions } from "../../utils/sidebar-options"
import { useUserStore } from "@/store/userStore"
import { useUserSessionSync } from "@/hooks/useUserSessionSync"
import { useRouter } from "next/navigation"
import { ChevronDown, FileText, Pen } from "lucide-react"

export default function Sidebar() {
  const { data: session } = useSession()
  useUserSessionSync();
  const user = useUserStore(state => state)
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleNewDocument = () => {
    router.push('/dashboard/editor');
    setIsDropdownOpen(false);
  };

  const handleLogout = async () => {
    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Sign out from NextAuth
    await signOut({ callbackUrl: "/" });

    // Force redirect to home page
    router.push("/");
  };

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
      <div className="relative mb-4" ref={dropdownRef}>
        <Button
          value="Criar"
          className="w-full justify-between"
          onClick={toggleDropdown}
          icon={<ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />}
        />
        {isDropdownOpen && (
          <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10">
            <button
              onClick={handleNewDocument}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Pen size={16} className="text-gray-500" />
              <span>Escrever</span>
            </button>
            <button
              disabled
              className="w-full text-left px-4 py-2 text-sm text-gray-400 flex items-center gap-2 cursor-not-allowed"
              title="Em breve"
            >
              <FileText size={16} className="text-gray-300" />
              <span>A partir de um template</span>
            </button>
          </div>
        )}
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
      <div className="absolute bottom-4 flex flex-col gap-2">
        <div className="flex justify-between gap-1 items-center">
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
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">{session?.user?.name}</p>
            <p className="text-xs text-ellipsis overflow-hidden whitespace-nowrap text-slate-600 max-w-[120px]">{session?.user?.email}</p>
          </div>
        </div>
        <Button
          value="Sair"
          className="w-full text-sm py-1 border border-slate-400"
          bgColor="white"
          textColor="black"
          onClick={handleLogout}
        />
      </div>
    </div>
  )
}