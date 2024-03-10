import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Chart as ChartJS } from "chart.js/auto";

const contestData = [
  { date: "2024-01-01", rating: 1200 },
  { date: "2024-01-08", rating: 1250 },
  { date: "2024-01-15", rating: 1300 },
  // Add more contest data here
];

const IQGraph = () => {
  const [chartData, setChartData] = useState({
    labels: contestData.map((entry) => entry.date),
    datasets: [
      {
        label: "Contest Rating",
        data: contestData.map((entry) => entry.rating),
        borderColor: "white",
        pointBackgroundColor: "white",
        pointBorderColor: "white",
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: "white",
      },
    ],
  });

  return (
    <Box
      margin="10px"
      padding="50px"
      border="1px solid #ccc"
      borderRadius="10px"
    >
      <Flex>
        <Box>
          {chartData && (
            <Line
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: "white",
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      color: "white",
                    },
                  },
                  y: {
                    ticks: {
                      color: "white",
                    },
                  },
                },
              }}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default IQGraph;
