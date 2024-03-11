import React from "react";
import { Bar } from "react-chartjs-2";
import { Flex } from "@chakra-ui/react";
import Chart from "chart.js/auto";

Chart.register({
  id: "uniqueid4",
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
      const radius = 8;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = "rgba(255, 152, 0, 0.2)";
      ctx.fill();
      ctx.closePath();
    }
  },
});
const generateIQScores = (mean, sd, count) => {
  const scores = [];
  for (let i = 0; i < count; i++) {
    let score;
    do {
      // Generate a random number following a normal distribution
      score =
        mean +
        sd *
          Math.sqrt(-2 * Math.log(Math.random())) *
          Math.cos(2 * Math.PI * Math.random());
    } while (score < 0 || score > 300); // Ensure IQ score is within the desired range (0-300)
    scores.push(Math.round(score));
  }
  return scores;
};

const USER_IQ = 120;

const IQBarGraph = () => {
  const IQScores = generateIQScores(100, 15, 100);
  console.log(IQScores);
  const labels = Array.from({ length: 30 }, (_, i) => (i + 1) * 10);
  const data = labels.map((threshold) => {
    return IQScores.filter(
      (score) => score >= threshold - 10 && score < threshold
    ).length;
  });

  const filteredLabels = [];
  const filteredData = [];
  for (let i = 0; i < labels.length; i++) {
    if (data[i] !== 0) {
      filteredLabels.push(`${labels[i] - 10}-${labels[i]}`);
      filteredData.push(data[i]);
    }
  }

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        label: "Number of People",
        data: filteredData,
        backgroundColor: filteredLabels.map((threshold) => {
          const [lowerBound, upperBound] = threshold.split("-").map(Number);

          //console.log(USER_IQ, lowerBound, upperBound);

          // Check if USER_IQ falls within the range
          return USER_IQ < lowerBound + 10 && USER_IQ >= lowerBound
            ? "rgba(255, 152, 0, 0.8)"
            : "rgba(40, 37, 55, 0.8)";
        }),
        borderColor: "#1a1527",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    indexAxis: "x",
    scales: {
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
          stepSize: 1,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
      },
    },
  };

  return (
    <Flex
      style={{ width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
      p={"10px"}
    >
      <Bar data={chartData} options={options} />
    </Flex>
  );
};

export default IQBarGraph;
