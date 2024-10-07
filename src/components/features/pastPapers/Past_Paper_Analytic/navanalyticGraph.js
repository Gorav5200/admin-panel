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

const NavAnalyticGraph = () => {
  const data = [
    {
      name: 3,
      male: 70,
      Female: 90,
      other: 30,
    },
    {
      name: 9,
      male: 90,
      Female: 85,
      other: 40,
    },
    {
      name: 12,
      male: 95,
      Female: 100,
      other: 40,
    },
    {
      name: 15,
      male: 95,
      Female: 90,
      other: 80,
    },
    {
      name: 18,
      male: 110,
      Female: 95,
      other: 45,
    },
    {
      name: 21,
      male: 100,
      Female: 89,
      other: 85,
    },
    {
      name: 24,
      male: 120,
      Female: 90,
      other: 40,
    },
    {
      name: 27,
      male: 120,
      Female: 90,
      other: 40,
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
            dy: 50,
          }}
        />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="male" stroke="#82ca9d" strokeWidth={4} />
        <Line
          type="monotone"
          dataKey="Female"
          stroke="#8884d8"
          strokeWidth={4}
        />
        <Line
          type="monotone"
          dataKey="other"
          stroke="#f7c757"
          strokeWidth={4}
        />
      </LineChart>
    </>
  );
};

export default NavAnalyticGraph;
