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
  { Exam: "LogicalReasoning", Enrolled: 21, Attendees: 28 },
  { Exam: "Algebra", Enrolled: 28, Attendees: 30 },
  { Exam: "Grammer", Enrolled: 41, Attendees: 50 },
  { Exam: "Arthmetic", Enrolled: 73, Attendees: 80 },
  { Exam: "Mensuration", Enrolled: 99, Attendees: 120 },
  { Exam: "Calculus", Enrolled: 110, Attendees: 120 },
  { Exam: "Tables&Charts", Enrolled: 110, Attendees: 120 },
  { Exam: "Others", Enrolled: 120, Attendees: 110 },
];

export default function DoubleGraph() {
  return (
    <BarChart
      width={1180}
      height={600}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 90, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis
        dataKey="Exam"
        type="category"
        label={{
          value: "Class Name",
          angle: -90,
          position: "insideLeft",
          dx: -90,
          dy: -9,
        }}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="Enrolled"
        fill="orange"
        barSize={20}
        stackId="a"
        radius={[10, 0, 0, 10]}
      />
      <Bar
        dataKey="Attendees"
        fill="#f2c299"
        barSize={20}
        stackId="a"
        radius={[0, 10, 10, 0]}
      />
    </BarChart>
  );
}
