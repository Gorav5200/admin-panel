import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const StudyGraph = ({ totalUsers }) => {
  const [series] = useState([100, 100]); // Two slices for example
  const [options] = useState({
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        offsetY: 10,
        donut: {
          size: "30%", // Increase the overall size of the donut chart
          width: "80%", // Increase the width of the donut slices
        }, // adjust the position of the label
      },
    },
    labels: ["Avg.Active Study room", "Avg.Inactive Study room"], // Labels for the slices
    colors: ["#c94d2a", "#4432a8"], // Array of colors for the slices
    dataLabels: {
      enabled: false, // Disable the data labels
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      align: "center",
      style: {
        fontSize: "20px",
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#263238",
      },
    },
  });

  return (
    <>
      <div id="chart">
        <ReactApexChart options={options} series={series} type="donut" />
      </div>
      <div id="html-dist"></div>
    </>
  );
};
export default StudyGraph;
