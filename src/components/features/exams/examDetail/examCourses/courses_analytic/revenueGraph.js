import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueGraph = () => {
  const data = [
    {
      name: 3,
      TotalRevenue: 80,
    },
    {
      name: 9,
      TotalRevenue: 80,
    },
    {
      name: 12,
      TotalRevenue: 90,
    },
    {
      name: 15,
      TotalRevenue: 100,
    },
    {
      name: 18,
      TotalRevenue: 105,
    },
    {
      name: 21,
      TotalRevenue: 90,
    },
    {
      name: 24,
      TotalRevenue: 95,
    },
    {
      name: 27,
      TotalRevenue: 100,
    },
  ];
  return (
    <>
      <LineChart
        width={500}
        height={290}
        data={data}
        margin={{
          top: 5,
          right: 20,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis
          label={{
            value: "Rupees (In Lakhs)",
            angle: -90,
            position: "insideLeft",
            dx: -3,
            dy: 80,
            style: { fontWeight: 600 },
          }}
        />
        <Tooltip />
        <Legend />

        <Line
          type="monotone"
          dataKey="TotalRevenue"
          stroke="#82ca9d"
          strokeWidth={4}
        />
      </LineChart>
    </>
  );
};

export default RevenueGraph;
