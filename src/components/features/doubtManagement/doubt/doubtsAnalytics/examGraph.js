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
  { Exam: "GMAT", AvgActive: 21, TotalStudyRoom: 28 },
  { Exam: "CAT", AvgActive: 28, TotalStudyRoom: 30 },
  { Exam: "GRE", AvgActive: 41, TotalStudyRoom: 50 },
  { Exam: "NMAT", AvgActive: 73, TotalStudyRoom: 80 },
  { Exam: "SAT", AvgActive: 99, TotalStudyRoom: 120 },
  { Exam: "KMAT", AvgActive: 110, TotalStudyRoom: 120 },
  { Exam: "TOFEL", AvgActive: 110, TotalStudyRoom: 120 },
  { Exam: "Other", AvgActive: 120, TotalStudyRoom: 110 },
];

export default function ExamGraph() {
  return (
    <BarChart
      width={1380}
      height={600}
      data={data}
      layout="vertical"
      margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis type="number" />
      <YAxis
        dataKey="Exam"
        type="category"
        label={{
          value: "Exam",
          angle: -90,
          position: "insideLeft",
          dx: -50,
          dy: -9,
        }}
      />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="AvgActive"
        fill="orange"
        barSize={20}
        stackId="a"
        radius={[10, 0, 0, 10]}
      />
      <Bar
        dataKey="TotalStudyRoom"
        fill="#f2c299"
        barSize={20}
        stackId="a"
        radius={[0, 10, 10, 0]}
      />
    </BarChart>
  );
}
