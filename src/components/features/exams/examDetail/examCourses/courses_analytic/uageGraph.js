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

const UageGraph = () => {
  const data = [
    {
      name: 3,
      male: 70,
      female: 90,
      other: 30,
    },
    {
      name: 9,
      male: 90,
      female: 85,
      other: 40,
    },
    {
      name: 12,
      male: 95,
      female: 100,
      other: 40,
    },
    {
      name: 15,
      male: 95,
      female: 90,
      other: 80,
    },
    {
      name: 18,
      male: 110,
      female: 95,
      other: 45,
    },
    {
      name: 21,
      male: 100,
      female: 89,
      other: 85,
    },
    {
      name: 24,
      male: 120,
      female: 90,
      other: 40,
    },
    {
      name: 27,
      male: 120,
      female: 90,
      other: 40,
    },
  ];
  return (
    <>
      <LineChart
        width={1150}
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
            value: "Users (In lakhs)",
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
          dataKey="female"
          stroke="#8884d8"
          strokeWidth={4}
        />
        <Line type="monotone" dataKey="male" stroke="#82ca9d" strokeWidth={4} />
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

export default UageGraph;
