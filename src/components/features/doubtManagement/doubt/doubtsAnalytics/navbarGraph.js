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

const NavbarGraph = () => {
  const data = [
    {
      name: 3,
      uv: 70,
      pv: 90,
      amt: 30,
    },
    {
      name: 9,
      uv: 90,
      pv: 85,
      amt: 40,
    },
    {
      name: 12,
      uv: 95,
      pv: 100,
      amt: 40,
    },
    {
      name: 15,
      uv: 95,
      pv: 90,
      amt: 80,
    },
    {
      name: 18,
      uv: 110,
      pv: 95,
      amt: 45,
    },
    {
      name: 21,
      uv: 100,
      pv: 89,
      amt: 85,
    },
    {
      name: 24,
      uv: 120,
      pv: 90,
      amt: 40,
    },
    {
      name: 27,
      uv: 120,
      pv: 90,
      amt: 40,
    },
  ];
  return (
    <>
      <LineChart
        width={1290}
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
            value: "Users (in Lakh)",
            angle: -90,
            position: "insideLeft",
            offset: -10,
          }}
        />
        <Tooltip />
        <Legend />

        <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={4} />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={4} />
        <Line type="monotone" dataKey="amt" stroke="#f7c757" strokeWidth={4} />
      </LineChart>
    </>
  );
};

export default NavbarGraph;
