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

const GroupGraph = () => {
  const data = [
    {
      name: 3,
      TotalUser: 80,
      PermiumUser: 30,
    },
    {
      name: 9,
      TotalUser: 80,
      PermiumUser: 70,
    },
    {
      name: 12,
      TotalUser: 90,
      PermiumUser: 50,
    },
    {
      name: 15,
      TotalUser: 90,
      PermiumUser: 50,
    },
    {
      name: 18,
      TotalUser: 85,
      PermiumUser: 70,
    },
    {
      name: 21,
      TotalUser: 82,
      PermiumUser: 78,
    },
    {
      name: 24,
      TotalUser: 110,
      PermiumUser: 80,
    },
    {
      name: 27,
      TotalUser: 110,
      PermiumUser: 100,
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
            dataKey="TotalUser"
            stroke="#82ca9d"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="PermiumUser"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default GroupGraph;
