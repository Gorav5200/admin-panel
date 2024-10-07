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

const DoubtsGraph = () => {
  const data = [
    {
      name: 3,

      DoubtsRaised: 40,
    },
    {
      name: 9,

      DoubtsRaised: 45,
    },
    {
      name: 12,

      DoubtsRaised: 80,
    },
    {
      name: 15,

      DoubtsRaised: 80,
    },
    {
      name: 18,

      DoubtsRaised: 80,
    },
    {
      name: 21,

      DoubtsRaised: 100,
    },
    {
      name: 24,

      DoubtsRaised: 110,
    },
    {
      name: 27,

      DoubtsRaised: 100,
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
              value: "Numbers of doubts(in LakhS)",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              dy: 110,
              style: { fontWeight: 600 },
            }}
          />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="DoubtsRaised"
            stroke="#8884d8"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default DoubtsGraph;
