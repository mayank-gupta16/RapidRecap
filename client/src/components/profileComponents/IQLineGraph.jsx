import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, Flex } from "@chakra-ui/react";
import Chart from "chart.js/auto";

Chart.register({
  id: "uniqueid5", //typescript crashes without id
  afterDraw: function (chart, easing) {
    if (chart.tooltip._active && chart.tooltip._active.length) {
      const activePoint = chart.tooltip._active[0];
      const ctx = chart.ctx;
      const x = activePoint.element.x;
      const topY = chart.scales.y.top;
      const bottomY = chart.scales.y.bottom;

      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x, topY);
      ctx.lineTo(x, bottomY);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ff9800";
      ctx.stroke();
      ctx.restore();

      const y = activePoint.element.y;
      const radius = 8; // Adjust the size of the shadow
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(255, 152, 0, 0.2)"; // Orangish color with opacity
      ctx.fill();
      ctx.closePath();
    }
  },
});
const contestData = [
  { date: "", rating: null },
  { date: "January 24", rating: 500 },
  { date: "January 24", rating: 100 },
  { date: "February 24", rating: 1200 },
  // Add more contest data here
];

const IQLineGraph = () => {
  const [chartData, setChartData] = useState({
    labels: contestData.map((entry) => entry.date),
    datasets: [
      {
        data: contestData.map((entry) => entry.rating),
        borderColor: "#ff9800", // Orangish color for the line
        pointBackgroundColor: "#ff9800", // Orangish color for points
        pointBorderColor: "white",
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1, // Thin line
      },
    ],
  });

  const chartOptions = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: "nearest", // Enable interaction mode for closest point
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide x-axis grid lines
        },
        ticks: {
          color: "#ccc", // Lighter ticks color
          font: {
            size: 12,
          },
          callback: function (value, index, values) {
            if (index === 1 || index === values.length - 2) {
              return this.getLabelForValue(value); // Format the date
            } else {
              return "";
            }
          },
        },
        min: contestData[0].date, // Set min date to the first contest date
        max: contestData[contestData.length - 1].date + 1, // Set max date to the last contest date
      },
      y: {
        beginAtZero: true, // Start y-axis at zero
        display: false, // Hide y-axis
        min: 0, // Set min rating to 0
        max: contestData[contestData.length - 1].rating + 200, // Set max rating to the highest rating + 100
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        z: 2,
        tension: 0, // Set tension to 0 for straight lines
      },
      point: {
        z: 2, // Set z-index for points
        radius: 0, // Set point radius to 0 to remove the dots
      },
    },
    layout: {
      padding: {
        left: 10, // Adjust padding as needed
        right: 10, // Adjust padding as needed
        top: 10, // Adjust padding as needed
        bottom: 10, // Adjust padding as needed
      },
    },
  };

  return (
    <Box w={"100%"} borderRight={"1px"}>
      <Box>
        <Box>
          <Line data={chartData} options={chartOptions} />
        </Box>
      </Box>
    </Box>
  );
};

export default IQLineGraph;
