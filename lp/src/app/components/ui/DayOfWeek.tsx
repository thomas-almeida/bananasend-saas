interface DayOfWeekProps {
  day: string,
  focused: boolean,
  dayNotPassed: boolean,
  onClick: () => void
}

export default function DayOfWeek({ day, focused, dayNotPassed, onClick }: DayOfWeekProps) {
  return (
    <div
      style={
        focused
          ? {
            backgroundColor: "#2bb24a",
            color: "white"
          }
          : {
            backgroundColor: "#f1f1f1",
            color: "#868686",
            pointerEvents: "none"
          }
      }
      onClick={onClick}
      className={`py-6 px-4 rounded cursor-pointer ${focused ? "bg-slate-200" : ""} ${dayNotPassed ? "text-slate-600" : ""}`}
    >
      {day}
    </div>
  )
}