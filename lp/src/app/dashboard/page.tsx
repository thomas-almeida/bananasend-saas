import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

import DashboardClient from "../components/DashboardClient"
import { redirect } from "next/navigation"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <DashboardClient />
  )
}
