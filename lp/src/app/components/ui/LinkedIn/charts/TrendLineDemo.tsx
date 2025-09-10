"use client"

import { ResponsiveContainer, Bar, LineChart, CartesianGrid, XAxis, YAxis, Line, BarChart } from "recharts"

export default function TrendLineDemo() {

  const data = [
    {
      name: "Assunto 1",
      value: 1600
    },
    {
      name: "Assunto 2",
      value: 1000
    },
    {
      name: "Assunto 3",
      value: 878
    },
    {
      name: "Assunto 4",
      value: 500
    },
    {
      name: "Assunto 5",
      value: 320
    }
  ]

  return (
    <>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" interval={0} />
          <YAxis interval={0} />
          <Bar type="monotone" dataKey="value" stroke="#8884d8" fill="#2bb24a" />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}