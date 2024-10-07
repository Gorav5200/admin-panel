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

const Rsgraph = () => {
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
      TotalRevenue: 100,
    },
    {
      name: 21,
      TotalRevenue: 80,
    },
    {
      name: 24,
      TotalRevenue: 115,
    },
    {
      name: 27,
      TotalRevenue: 110,
    },
  ];
  return (
    <>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={600}
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
              value: "Users (in Lakhs)",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              dy: 70,
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

export default Rsgraph;
