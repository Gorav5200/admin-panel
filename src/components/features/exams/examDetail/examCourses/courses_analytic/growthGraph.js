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

const GrowthGraph = () => {
  const data = [
    {
      name: 3,
      totaluser: 80,
      newuser: 30,
    },
    {
      name: 9,
      totaluser: 80,
      newuser: 70,
    },
    {
      name: 12,
      totaluser: 90,
      newuser: 60,
    },
    {
      name: 15,
      totaluser: 100,
      newuser: 60,
    },
    {
      name: 18,
      totaluser: 90,
      newuser: 50,
    },
    {
      name: 21,
      totaluser: 80,
      newuser: 60,
    },
    {
      name: 24,
      totaluser: 120,
      newuser: 90,
    },
    {
      name: 27,
      totaluser: 110,
      newuser: 80,
    },
  ];
  return (
    <LineChart
      width={500}
      height={290}
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
          value: "Users (in lakhs)",
          angle: -90,
          position: "insideLeft",
          dx: -5,
          dy: 30,
          style: { fontWeight: 600 },
        }}
      />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="newuser"
        stroke="#8884d8"
        strokeWidth={4}
      />
      <Line
        type="monotone"
        dataKey="totaluser"
        stroke="#82ca9d"
        strokeWidth={4}
      />
    </LineChart>
  );
};

export default GrowthGraph;
