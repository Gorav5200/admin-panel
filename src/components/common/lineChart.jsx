// src/BasicLineChart.js
import React from 'react';
import Chart from 'react-apexcharts';

const BasicLineChart = () => {
  const chartOptions = {
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 25, 50, 49, 21, 70, 51],
      },
    ],
    chart: {
      height: 200,
      type: 'line',
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8],
    },
  };

  return (
    <div>
      <Chart options={chartOptions} series={chartOptions.series} type="line" height={200} />
    </div>
  );
};

export default BasicLineChart;
