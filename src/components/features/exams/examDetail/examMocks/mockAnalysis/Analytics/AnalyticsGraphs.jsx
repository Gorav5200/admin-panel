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

const AnalyticsGraphs = () => {
  const data = [
    {
      name: 3,
      male: 80,
      female: 90,
      other: 40,
    },
    {
      name: 9,
      male: 60,
      female: 100,
      other: 45,
    },
    {
      name: 12,
      male: 80,
      female: 110,
      other: 70,
    },
    {
      name: 15,
      male: 110,
      female: 120,
      other: 100,
    },
    {
      name: 18,
      male: 80,
      female: 100,
      other: 70,
    },
    {
      name: 21,
      male: 100,
      female: 90,
      other: 60,
    },
    {
      name: 24,
      male: 110,
      female: 100,
      other: 90,
    },
    {
      name: 27,
      male: 110,
      female: 120,
      other: 100,
    },
  ];
  return (
    <>
      <LineChart
        width={1150}
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
            value: "Users (In Lakh)",
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
          dataKey="female"
          stroke="#8884d8"
          strokeWidth={4}
        />
        <Line type="monotone" dataKey="male" stroke="#82ca9d" strokeWidth={4} />
        <Line
          type="monotone"
          dataKey="other"
          stroke="#ebbb2a"
          strokeWidth={4}
        />
      </LineChart>
    </>
  );
};

export default AnalyticsGraphs;
