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

const UserGraph = () => {
  const data = [
    {
      name: 3,
      uv: 80,
      pv: 30,
    },
    {
      name: 9,
      uv: 80,
      pv: 70,
    },
    {
      name: 12,
      uv: 90,
      pv: 50,
    },
    {
      name: 15,
      uv: 90,
      pv: 50,
    },
    {
      name: 18,
      uv: 85,
      pv: 70,
    },
    {
      name: 21,
      uv: 82,
      pv: 78,
    },
    {
      name: 24,
      uv: 110,
      pv: 80,
    },
    {
      name: 27,
      uv: 110,
      pv: 100,
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
              value: "Users",
              angle: -90,
              position: "insideLeft",
              offset: -8,
            }}
          />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={3} />
          <Line type="monotone" dataKey="uv" stroke="#c94d2a" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserGraph;
