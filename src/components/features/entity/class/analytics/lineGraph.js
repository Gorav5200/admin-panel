import React from "react";
import Chart from "react-apexcharts";

const LineGraph = () => {
  const chartOptions = {
    series: [
      {
        name: "Series 1",
        data: [30, 40, 35, 50, 49, 38, 50, 51],
      },
    ],
    chart: {
      height: 400,
      type: "line",
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    yaxis: {
      title: {
        text: "Users (in lakh)",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
        offsetX: -6, // Adjust this value to add padding between the y-axis label and the y-axis
      },
      axisBorder: {
        show: true,
        color: "#78909C",
        width: 1,
        offsetX: 0,
        offsetY: 0,
      },
      axisTicks: {
        show: true,
        borderType: "solid",
        color: "#78909C",
        width: 6,
        offsetX: 0,
        offsetY: 0,
      },
    },
    colors: ["#4a1cd6"],
  };

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={300}
        width={550}
      />
    </div>
  );
};

export default LineGraph;
