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

const ExpressGraph = () => {
  const data = [
    {
      name: 3,
      DoubtsRaised: 80,
    },
    {
      name: 9,
      DoubtsRaised: 30,
    },
    {
      name: 12,
      DoubtsRaised: 60,
    },
    {
      name: 15,
      DoubtsRaised: 100,
    },
    {
      name: 18,
      DoubtsRaised: 90,
    },
    {
      name: 21,
      DoubtsRaised: 80,
    },
    {
      name: 24,
      DoubtsRaised: 115,
    },
    {
      name: 27,
      DoubtsRaised: 110,
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

          <Line
            type="monotone"
            dataKey="DoubtsRaised"
            stroke="#8884d8"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default ExpressGraph;
