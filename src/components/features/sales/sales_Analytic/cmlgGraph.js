import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    Cources: "CAT 2021",
    Sales: 100,
  },
  {
    Cources: "GMAT 2021",
    Sales: 140,
  },
  {
    Cources: "NMAT Crash",
    Sales: 110,
  },
  {
    Cources: "TOFEL Full",
    Sales: 120,
  },
  {
    Cources: "GRE Crash",
    Sales: 100,
  },
  {
    Cources: "Others",
    Sales: 130,
  },
];

export default function CmlgGraph() {
  return (
    <BarChart
      width={700}
      height={280}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="Cources" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="Sales"
        fill="#ffb24d"
        barSize={20}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  );
}
