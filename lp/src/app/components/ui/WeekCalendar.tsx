"use client"

import DayOfWeek from "./DayOfWeek"
import { useState } from "react"

interface WeekCalendarProps {
  daysAmount: number
}

const week = [
  'SEG',
  'TER',
  'QUA',
  'QUI',
  'SEX',
  'SAB',
  'DOM'
]

const totalWeekDays = new Date().getDay() - 1
console.log(totalWeekDays)

export default function WeekCalendar({ daysAmount }: WeekCalendarProps) {

  const [selectedDay, setSelectedDay] = useState<number | null>(totalWeekDays)

  function selectDay(currentDay: number, today: number) {
    if (today >= currentDay) {
      setSelectedDay(currentDay)
    }
  }

  return (
    <div
      className="grid justify-center gap-2"
      style={{
        gridTemplateColumns: `repeat(${daysAmount}, 1fr)`
      }}
    >
      {
        week.map((day, index) => (
          <DayOfWeek
            key={index}
            day={day}
            focused={selectedDay === index}
            dayNotPassed={index < totalWeekDays}
            onClick={() => selectDay(index, totalWeekDays)}
          />
        ))
      }
    </div>
  )
}