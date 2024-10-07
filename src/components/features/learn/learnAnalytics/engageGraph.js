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

const EngageGraph = () => {
  const data = [
    {
      name: 3,
      TotalHours: 80,
    },
    {
      name: 9,
      TotalHours: 80,
    },
    {
      name: 12,
      TotalHours: 90,
    },
    {
      name: 15,
      TotalHours: 90,
    },
    {
      name: 18,
      TotalHours: 85,
    },
    {
      name: 21,
      TotalHours: 82,
    },
    {
      name: 24,
      TotalHours: 110,
    },
    {
      name: 27,
      TotalHours: 110,
    },
  ];
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={550}
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
              value: "Hours",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              dy: 50,
              style: { fontWeight: 600 },
            }}
          />
          <Tooltip />
          <Legend />

          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={3} /> */}
          <Line
            type="monotone"
            dataKey="TotalHours"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default EngageGraph;
