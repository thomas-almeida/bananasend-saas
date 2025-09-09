import Sidebar from "../components/ui/Sidebar"
import Breadcrumb from "../components/ui/Breadcrumb"
import PlanBanner from "../components/ui/PlanBanner"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh items-start font-mono">
      <Sidebar />
      <main className="flex-1 border-l border-slate-200 overflow-y-auto h-dvh">
        <PlanBanner />
        <div className="flex justify-center min-h-full p-4 mt-6">
          <div className="w-[80%]">
            <Breadcrumb />
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}