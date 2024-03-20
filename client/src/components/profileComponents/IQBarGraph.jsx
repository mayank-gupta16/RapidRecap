import React, { useEffect, useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Flex, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";

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

const USER_IQ = 125;

const IQScores = generateIQScores(100, 15, 1000);

const calculatePercentile = (userIQ, IQScores) => {
  // Sort the IQ scores in ascending order
  const sortedScores = IQScores.sort((a, b) => a - b);

  // Find the index of the user's IQ score
  const index = sortedScores.findIndex((score) => score >= userIQ);

  // Calculate the percentile
  const percentile = ((index + 1) / sortedScores.length) * 100;

  return percentile;
};
const TOP_PERCENT = (100 - calculatePercentile(USER_IQ, IQScores)).toFixed(2);

const labels = Array.from({ length: 30 }, (_, i) => (i + 1) * 10);
const data = labels.map((threshold) => {
  return IQScores.filter(
    (score) => score >= threshold - 10 && score < threshold
  ).length;
});

const filteredLabels = [];
const filteredIQData = [];
for (let i = 0; i < labels.length; i++) {
  if (data[i] !== 0) {
    filteredLabels.push(`${labels[i] - 10}-${labels[i]}`);
    filteredIQData.push(data[i]);
  }
}

const calculatePercentilesOfEachBar = (
  IQScores,
  filteredLabels,
  filteredIQData
) => {
  const percentiles = [];

  // Define the function to calculate percentile
  const calculatePercentile = (iqScore) => {
    const sortedScores = IQScores.sort((a, b) => a - b);
    const index = sortedScores.findIndex((score) => score >= iqScore);
    return index === 0 ? 100 : 100 - ((index + 1) / sortedScores.length) * 100;
  };

  // Iterate through each data point
  for (let i = 0; i < filteredLabels.length; i++) {
    const [lowerBound, upperBound] = filteredLabels[i].split("-").map(Number);
    const percentile = calculatePercentile(lowerBound).toFixed(2);
    percentiles.push({
      lowerBound,
      upperBound,
      percentile,
      count: filteredIQData[i],
    });
  }

  return percentiles;
};

const percentileData = calculatePercentilesOfEachBar(
  IQScores,
  filteredLabels,
  filteredIQData
);

const IQBarGraph = () => {
  const [hoveredPercentile, setHoveredPercentile] = useState(TOP_PERCENT);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentData, setCurrentData] = useState(null);

  //console.log(filteredLabels, filteredIQData);
  const [chartData, setChartData] = useState({
    labels: filteredLabels,
    datasets: [
      {
        label: "Number of People",
        data: filteredIQData,
        backgroundColor: filteredLabels.map((threshold) => {
          const [lowerBound, upperBound] = threshold.split("-").map(Number);

          //console.log(USER_IQ, lowerBound, upperBound);

          // Check if USER_IQ falls within the range
          return USER_IQ < lowerBound + 10 && USER_IQ >= lowerBound
            ? "rgba(255, 152, 0, 0.8)"
            : "rgba(84, 62, 122, 0.9)";
        }),
        borderColor: "#1a1527",
        borderRadius: "5",
        minBarLength: "15",
      },
    ],
  });

  const handleHover = (event, array) => {
    setIsHovering(true);
    //console.log(array);
    //console.log("hovering");
    if (array && array.length) {
      const point = array[0];
      const index = point.index;
      const percentile = percentileData[index].percentile;

      setHoveredIndex(index);
      //console.log(index);
      setHoveredPercentile(percentile);
    } else {
      setHoveredPercentile(TOP_PERCENT);
    }
  };
  const options = {
    animation: {
      duration: 0,
    },
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
      tooltip: {
        enabled: false, // Disable default tooltip
      },
      legend: {
        display: false,
      },
      minHeightBar: {
        minHeight: 100, // Minimum height for each bar (in pixels)
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
      },
    },
    onHover: handleHover,
    hover: {
      mode: "index",
      intersect: false,
    },
    elements: {
      line: {
        borderWidth: 0, // Hide the line
      },
      point: {
        radius: 10, // Hide the point
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };
  const chartRef = useRef(null);
  useEffect(() => {
    const chartCanvas = chartRef.current?.canvas;
    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoveredIndex(null);
      setHoveredPercentile(TOP_PERCENT);
      setCurrentData(null);
    };

    if (chartCanvas) {
      chartCanvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (chartCanvas) {
        chartCanvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [hoveredPercentile, isHovering]);

  useEffect(() => {
    const count = hoveredIndex ? percentileData[hoveredIndex].count : null;
    const range = hoveredIndex
      ? `${percentileData[hoveredIndex].lowerBound}-${percentileData[hoveredIndex].upperBound}`
      : null;
    setCurrentData({ range, count });
    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: prevChartData.datasets.map((dataset) => ({
        ...dataset,
        backgroundColor: filteredLabels.map((threshold, idx) => {
          const [lowerBound, upperBound] = threshold.split("-").map(Number);
          return (USER_IQ < lowerBound + 10 &&
            USER_IQ >= lowerBound &&
            !isHovering) ||
            idx === hoveredIndex
            ? "#776B5D"
            : "#DED0B6";
        }),
      })),
    }));
  }, [hoveredIndex]);

  return (
    <Flex
      flexDirection={"column"}
      style={{ width: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex width={"100%"}>
        <Flex marginStart={"15px"} flexDirection={"column"}>
          <Text textAlign={"left"} color={"#9CAFAA"} p={0} m={0}>
            Top
          </Text>
          <Text textAlign={"left"} fontSize={"1.5rem"}>
            {hoveredPercentile}%
          </Text>
        </Flex>
        {currentData ? (
          <Flex marginLeft={"40px"} flexDirection={"column"}>
            <Text textAlign={"left"} color={"#9CAFAA"} p={0} m={0}>
              {currentData.range}
            </Text>
            {currentData.count && (
              <Text textAlign={"left"}>{currentData.count} users</Text>
            )}
          </Flex>
        ) : null}
      </Flex>
      <Flex height={"150px"} width={"100%"} justifyContent={"center"}>
        <Bar ref={chartRef} data={chartData} options={options} />
      </Flex>
    </Flex>
  );
};

export default IQBarGraph;
