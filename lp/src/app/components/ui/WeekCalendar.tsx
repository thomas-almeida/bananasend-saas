"use client"

import DayOfWeek from "./DayOfWeek";
import { useState, useEffect } from "react";

interface WeekCalendarProps {
  daysAmount: number;
}

const week = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

export default function WeekCalendar({ daysAmount }: WeekCalendarProps) {
  const [totalWeekDays, setTotalWeekDays] = useState<number>(-1); // Initialize with a safe value
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  useEffect(() => {
    // This code runs only on the client, after hydration
    const today = new Date().getDay() - 1;
    setTotalWeekDays(today);
    setSelectedDay(today);
  }, []);

  function selectDay(currentDay: number, today: number) {
    if (today >= currentDay) {
      setSelectedDay(currentDay);
    }
  }

  // Prevent rendering on the server or before hydration is complete
  if (totalWeekDays === -1) {
    return null; // or a loading skeleton
  }

  return (
    <div
      className="grid justify-center gap-2"
      style={{
        gridTemplateColumns: `repeat(${daysAmount}, 1fr)`,
      }}
    >
      {week.map((day, index) => (
        <DayOfWeek
          key={index}
          day={day}
          focused={selectedDay === index}
          dayNotPassed={index < totalWeekDays}
          onClick={() => selectDay(index, totalWeekDays)}
        />
      ))}
    </div>
  );
}