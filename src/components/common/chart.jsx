import React from "react";
import Chart from "react-apexcharts";

const PieChart = () => {
  const chartOptions = {
    labels: [
      "Category A",
      "Category B",
      "Category C",
      "Category D",
      "Category E",
    ],
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        type: "pie",
      },
      labels: [
        "Category A",
        "Category B",
        "Category C",
        "Category D",
        "Category E",
      ],
    },
  };
  return (
    <div>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="pie"
        width="320"
      />
    </div>
  );
};

export default PieChart;
