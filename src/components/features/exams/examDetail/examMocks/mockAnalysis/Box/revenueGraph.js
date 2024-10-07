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
      TotalRevenue: 40,
    },
    {
      name: 9,
      TotalRevenue: 30,
    },
    {
      name: 12,
      TotalRevenue: 80,
    },
    {
      name: 15,
      TotalRevenue: 100,
    },
    {
      name: 18,
      TotalRevenue: 90,
    },
    {
      name: 21,
      TotalRevenue: 70,
    },
    {
      name: 24,
      TotalRevenue: 80,
    },
    {
      name: 27,
      TotalRevenue: 120,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Rupess (In Lakh)",
              angle: -90,
              position: "insideLeft",
              dx: -4,
              dy: 90,
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
      </ResponsiveContainer>
    </>
  );
};

export default RevenueGraph;
