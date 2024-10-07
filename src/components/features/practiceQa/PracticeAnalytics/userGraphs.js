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

const UserGraphs = () => {
  const data = [
    {
      name: 3,
      TotalUsers: 80,
      NewUsers: 30,
    },
    {
      name: 9,
      TotalUsers: 80,
      NewUsers: 70,
    },
    {
      name: 12,
      TotalUsers: 90,
      NewUsers: 50,
    },
    {
      name: 15,
      TotalUsers: 90,
      NewUsers: 50,
    },
    {
      name: 18,
      TotalUsers: 85,
      NewUsers: 70,
    },
    {
      name: 21,
      TotalUsers: 82,
      NewUsers: 78,
    },
    {
      name: 24,
      TotalUsers: 110,
      NewUsers: 80,
    },
    {
      name: 27,
      TotalUsers: 110,
      NewUsers: 100,
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

          <Line
            type="monotone"
            dataKey="TotalUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="NewUsers"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserGraphs;
