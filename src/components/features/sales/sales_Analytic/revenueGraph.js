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

const RevenueGraph = () => {
  const data = [
    {
      name: 3,
      uv: 80,

      amt: 0,
    },
    {
      name: 9,
      uv: 80,

      amt: 40,
    },
    {
      name: 12,
      uv: 90,

      amt: 80,
    },
    {
      name: 15,
      uv: 100,

      amt: 100,
    },
    {
      name: 18,
      uv: 100,

      amt: 120,
    },
    {
      name: 21,
      uv: 80,

      amt: 140,
    },
    {
      name: 24,
      uv: 115,

      amt: 160,
    },
    {
      name: 27,
      uv: 110,

      amt: 120,
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
          <YAxis />
          <Tooltip />
          <Legend />

          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={4} /> */}
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" strokeWidth={4} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default RevenueGraph;
