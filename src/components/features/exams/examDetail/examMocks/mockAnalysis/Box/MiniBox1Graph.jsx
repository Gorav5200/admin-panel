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

const MiniBox1Graph = () => {
  const data = [
    {
      name: 3,
      TotalSales: 40,
    },
    {
      name: 9,
      TotalSales: 30,
    },
    {
      name: 12,
      TotalSales: 80,
    },
    {
      name: 15,
      TotalSales: 100,
    },
    {
      name: 18,
      TotalSales: 40,
    },
    {
      name: 21,
      TotalSales: 70,
    },
    {
      name: 24,
      TotalSales: 80,
    },
    {
      name: 27,
      TotalSales: 120,
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
              value: "Sales Units (in thousands)",
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
            dataKey="TotalSales"
            stroke="#82ca9d"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MiniBox1Graph;
