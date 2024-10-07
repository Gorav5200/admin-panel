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

const UserTypeGraph = () => {
  const data = [
    {
      name: 3,
      PaidUsers: 80,
      FreeUser: 40,
    },
    {
      name: 9,
      PaidUsers: 90,
      FreeUser: 45,
    },
    {
      name: 12,
      PaidUsers: 100,
      FreeUser: 80,
    },
    {
      name: 15,
      PaidUsers: 110,
      FreeUser: 80,
    },
    {
      name: 18,
      PaidUsers: 115,
      FreeUser: 80,
    },
    {
      name: 21,
      PaidUsers: 118,
      FreeUser: 100,
    },
    {
      name: 24,
      PaidUsers: 120,
      FreeUser: 110,
    },
    {
      name: 27,
      PaidUsers: 120,
      FreeUser: 100,
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
              dy: 70,
              style: { fontWeight: 600 },
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="PaidUsers"
            stroke="#82ca9d"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="FreeUser"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default UserTypeGraph;
