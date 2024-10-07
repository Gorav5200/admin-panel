import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const NavAnalyticGph = () => {
  const data = [
    {
      name: 3,
      Male: 70,
      Female: 90,
      Other: 30,
    },
    {
      name: 9,
      Male: 90,
      Female: 85,
      Other: 40,
    },
    {
      name: 12,
      Male: 95,
      Female: 100,
      Other: 40,
    },
    {
      name: 15,
      Male: 95,
      Female: 90,
      Other: 80,
    },
    {
      name: 18,
      Male: 110,
      Female: 95,
      Other: 45,
    },
    {
      name: 21,
      Male: 100,
      Female: 89,
      Other: 85,
    },
    {
      name: 24,
      Male: 120,
      Female: 90,
      Other: 40,
    },
    {
      name: 27,
      Male: 120,
      Female: 90,
      Other: 40,
    },
  ];
  return (
    <>
      <LineChart
        width={1300}
        height={350}
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
            dy: 80,
            style: { fontWeight: 600 },
          }}
        />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="Male" stroke="#82ca9d" strokeWidth={4} />
        <Line
          type="monotone"
          dataKey="Female"
          stroke="#8884d8"
          strokeWidth={4}
        />

        <Line
          type="monotone"
          dataKey="Other"
          stroke="#f7c757"
          strokeWidth={4}
        />
      </LineChart>
    </>
  );
};

export default NavAnalyticGph;
