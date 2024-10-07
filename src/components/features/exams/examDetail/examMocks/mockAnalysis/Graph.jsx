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

const Graph = () => {
  const data = [
    {
      name: 3,
      TotalUser: 80,
      NewUser: 40,
    },
    {
      name: 9,
      TotalUser: 85,
      NewUser: 45,
    },
    {
      name: 12,
      TotalUser: 80,
      NewUser: 100,
    },
    {
      name: 15,
      TotalUser: 110,
      NewUser: 85,
    },
    {
      name: 18,
      TotalUser: 40,
      NewUser: 60,
    },
    {
      name: 21,
      TotalUser: 110,
      NewUser: 90,
    },
    {
      name: 24,
      TotalUser: 120,
      NewUser: 110,
    },
  ];
  return (
    <LineChart
      width={1100}
      height={280}
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
          value: "Users (in Lakh)",
          angle: -90,
          position: "insideLeft",
          offset: -10,
          dy: 55,
        }}
      />
      <Tooltip />
      <Legend />

      <Line
        type="monotone"
        dataKey="NewUser"
        stroke="#8884d8"
        strokeWidth={4}
      />
      <Line
        type="monotone"
        dataKey="TotalUser"
        stroke="#82ca9d"
        strokeWidth={4}
      />
    </LineChart>
  );
};

export default Graph;
