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

const CoinsGraph = () => {
  const data = [
    {
      name: 3,
      Bundles: 80,
    },
    {
      name: 9,
      Bundles: 80,
    },
    {
      name: 12,
      Bundles: 90,
    },
    {
      name: 15,
      Bundles: 100,
    },
    {
      name: 18,
      Bundles: 100,
    },
    {
      name: 21,
      Bundles: 80,
    },
    {
      name: 24,
      Bundles: 115,
    },
    {
      name: 27,
      Bundles: 110,
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
          <Line
            type="monotone"
            dataKey="Bundles"
            stroke="#8884d8"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default CoinsGraph;
