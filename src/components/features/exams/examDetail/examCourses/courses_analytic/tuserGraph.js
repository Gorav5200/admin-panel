import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const TuserGraph = ({ totalUsers }) => {
  const series = [788, 255, 458, 125];
  const total = series.reduce((acc, curr) => acc + curr, 0);
  const options = {
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Users",
              formatter: () => total,
              style: {
                fontSize: "20px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#263238",
              },
            },
          },
        },
      },
    },
    labels: [
      "CAT full Course",
      "CAT six months pack",
      "CAT crash course",
      "CAT quick learn",
    ],
    dataLabels: {
      enabled: false, // Disable the data labels
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" />
    </div>
  );
};

export default TuserGraph;
