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

const SalesGraph = () => {
  const data = [
    {
      name: 3,
      TotalSales: 80,
    },
    {
      name: 9,
      TotalSales: 80,
    },
    {
      name: 12,
      TotalSales: 90,
    },
    {
      name: 15,
      TotalSales: 100,
    },
    {
      name: 18,
      TotalSales: 100,
    },
    {
      name: 21,
      TotalSales: 80,
    },
    {
      name: 24,
      TotalSales: 115,
    },
    {
      name: 27,
      TotalSales: 110,
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
          <YAxis
            label={{
              value: "Sales Units (in thousands)",
              angle: -90,
              position: "insideLeft",
              dx: -5,
              dy: 90,
              style: { fontWeight: 600 },
            }}
          />
          <Tooltip />
          <Legend />

          {/* <Line type="monotone" dataKey="pv" stroke="#8884d8" strokeWidth={4} /> */}
          <Line
            type="monotone"
            dataKey="TotalSales"
            stroke="#82ca9d"
            strokeWidth={4}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default SalesGraph;
