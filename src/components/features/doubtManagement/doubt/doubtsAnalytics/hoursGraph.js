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
    Cources: "GMAT",
    Sales: 100,
  },
  {
    Cources: "CAT",
    Sales: 140,
  },
  {
    Cources: "SAT",
    Sales: 110,
  },
  {
    Cources: "GRE",
    Sales: 120,
  },
  {
    Cources: "TOFEL",
    Sales: 100,
  },
  {
    Cources: "KMAT",
    Sales: 130,
  },
  {
    Cources: "KMAT",
    Sales: 130,
  },
  {
    Cources: "KMAT",
    Sales: 130,
  },
  {
    Cources: "KMAT",
    Sales: 130,
  },
  {
    Cources: "KMAT",
    Sales: 130,
  },
];

export default function HoursGraph() {
  return (
    <BarChart
      width={1400}
      height={290}
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
      <YAxis
        label={{
          value: "Hours",
          angle: -90,
          position: "insideLeft",
          offset: -1,
        }}
      />
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
