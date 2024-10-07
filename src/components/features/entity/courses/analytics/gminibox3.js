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

const GminiBox3 = () => {
  const data = [
    {
      name: 3,
      TotalSales: 80,
    },
    {
      name: 9,
      TotalSales: 80,
    },
    {
      name: 12,
      TotalSales: 90,
    },
    {
      name: 15,
      TotalSales: 100,
    },
    {
      name: 18,
      TotalSales: 105,
    },
    {
      name: 21,
      TotalSales: 90,
    },
    {
      name: 24,
      TotalSales: 95,
    },
    {
      name: 27,
      TotalSales: 100,
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
            value: "Rupees (In lakhs)",
            angle: -90,
            position: "insideLeft",
            dx: -4,
            dy: 70,
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
    </>
  );
};

export default GminiBox3;
