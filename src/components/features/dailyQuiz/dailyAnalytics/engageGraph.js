import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: 3, Assignment: 110, PastPaper: 57, TimedQuiz: 86, PracticeQA: 41 },
  { month: 9, Assignment: 50, PastPaper: 52, TimedQuiz: 78, PracticeQA: 28 },
  { month: 12, Assignment: 47, PastPaper: 53, TimedQuiz: 106, PracticeQA: 41 },
  { month: 15, Assignment: 54, PastPaper: 56, TimedQuiz: 92, PracticeQA: 73 },
  { month: 18, Assignment: 54, PastPaper: 56, TimedQuiz: 92, PracticeQA: 73 },
  { month: 24, Assignment: 60, PastPaper: 63, TimedQuiz: 103, PracticeQA: 110 },
  { month: 27, Assignment: 59, PastPaper: 60, TimedQuiz: 105, PracticeQA: 120 },
];

const EngageGraph = () => (
  <ResponsiveContainer width={600} height={280}>
    <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      {/* <CartesianGrid strokeDasharray="" /> */}
      <XAxis dataKey="month" />
      <YAxis
        label={{
          value: "Hours",
          angle: -90,
          position: "insideLeft",
          dy: 30,
        }}
      />
      <Tooltip />
      <Legend
        verticalAlign="top"
        height={36}
        wrapperStyle={{ marginBottom: 30 }}
      />
      <Bar
        dataKey="Assignment"
        fill="#4DA1FF"
        barSize={8}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="PastPaper"
        fill="#6A6A9F"
        barSize={8}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="TimedQuiz"
        fill="#FFD12F"
        barSize={8}
        radius={[10, 10, 0, 0]}
      />
      <Bar
        dataKey="PracticeQA"
        fill="#E56C51"
        barSize={8}
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
);

export default EngageGraph;
