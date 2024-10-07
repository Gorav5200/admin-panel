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

const ChallengeGraph = () => {
  const data = [
    {
      name: 3,
      challenges: 80,
    },
    {
      name: 9,
      challenges: 80,
    },
    {
      name: 12,
      challenges: 90,
    },
    {
      name: 15,
      challenges: 90,
    },
    {
      name: 18,
      challenges: 85,
    },
    {
      name: 21,
      challenges: 82,
    },
    {
      name: 24,
      challenges: 110,
    },
    {
      name: 27,
      challenges: 110,
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
              value: "Number of challenges(in lakhs)",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              dy: 115,
              style: { fontWeight: 600 },
            }}
          />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="challenges"
            stroke="#82ca9d"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ChallengeGraph;
