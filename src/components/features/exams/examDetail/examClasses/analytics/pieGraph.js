import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieGraph = ({ totalUsers }) => {
  const [series] = useState([100, 100]); // Two slices for example
  const [options] = useState({
    chart: {
      type: "donut",
      height: 900,
    },
    plotOptions: {
      pie: {
        offsetY: 10,
        donut: {
          size: "30%", // Increase the overall size of the donut chart
          width: "80%",
          height: "50%",
          // Increase the width of the donut slices
        }, // adjust the position of the label
      },
    },
    labels: ["Total classes scheduled", "Total classes conducted"], // Labels for the slices
    colors: ["#32a852", "#5146D6"], // Array of colors for the slices
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
export default PieGraph;
