"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"

const data = [
  {
    views: 200,
    inquiries: 40,
  },
  {
    views: 300,
    inquiries: 45,
  },
  {
    views: 250,
    inquiries: 50,
  },
  {
    views: 400,
    inquiries: 70,
  },
  {
    views: 450,
    inquiries: 85,
  },
  {
    views: 500,
    inquiries: 90,
  },
  {
    views: 550,
    inquiries: 100,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Views
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Inquiries
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}
                      </span>
                    </div>
                  </div>
                </div>
              )
            }
            return null
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="views"
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--chart-1))" },
          }}
          style={{
            stroke: "hsl(var(--chart-1))",
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="inquiries"
          activeDot={{
            r: 6,
            style: { fill: "hsl(var(--chart-2))" },
          }}
          style={{
            stroke: "hsl(var(--chart-2))",
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}