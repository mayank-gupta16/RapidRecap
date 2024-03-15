import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Flex, Text } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import moment from "moment";
import "chartjs-adapter-date-fns";

let contestData = [
  { date: null, IQScore: null, dailyRank: null },
  { date: "2024:01:15", IQScore: 100, dailyRank: "1000/6000" },
  { date: "2024:01:16", IQScore: 99, dailyRank: "2424/6024" },
  { date: "2024:01:17", IQScore: 98, dailyRank: "1212/6026" },
  { date: "2024:01:18", IQScore: 97, dailyRank: "3030/6030" },
  { date: "2024:01:19", IQScore: 96, dailyRank: "1616/6035" },
  { date: "2024:01:20", IQScore: 95, dailyRank: "727/6036" },
  { date: "2024:01:21", IQScore: 94, dailyRank: "858/6041" },
  { date: "2024:01:22", IQScore: 93, dailyRank: "1818/6045" },
  { date: "2024:01:23", IQScore: 92, dailyRank: "1717/6048" },
  { date: "2024:01:24", IQScore: 91, dailyRank: "3030/6050" },
  { date: "2024:01:25", IQScore: 90, dailyRank: "555/6052" },
  { date: "2024:01:26", IQScore: 91, dailyRank: "3737/6055" },
  { date: "2024:01:27", IQScore: 92, dailyRank: "989/6060" },
  { date: "2024:01:28", IQScore: 93, dailyRank: "2929/6063" },
  { date: "2024:01:29", IQScore: 94, dailyRank: "505/6065" },
  { date: "2024:01:30", IQScore: 95, dailyRank: "2222/6066" },
  { date: "2024:01:31", IQScore: 96, dailyRank: "303/6067" },
  { date: "2024:02:01", IQScore: 97, dailyRank: "4343/6070" },
  { date: "2024:02:02", IQScore: 98, dailyRank: "111/6075" },
  { date: "2024:02:03", IQScore: 99, dailyRank: "222/6080" },
  { date: "2024:02:04", IQScore: 100, dailyRank: "7676/6083" },
  { date: "2024:02:05", IQScore: 99, dailyRank: "888/6085" },
  { date: "2024:02:06", IQScore: 98, dailyRank: "2828/6088" },
  { date: "2024:02:07", IQScore: 97, dailyRank: "2121/6090" },
  { date: "2024:02:08", IQScore: 96, dailyRank: "3737/6095" },
  { date: "2024:02:09", IQScore: 95, dailyRank: "5656/6097" },
  { date: "2024:02:10", IQScore: 94, dailyRank: "909/6100" },
  { date: "2024:02:11", IQScore: 93, dailyRank: "2222/6103" },
  { date: "2024:02:12", IQScore: 92, dailyRank: "505/6106" },
  { date: "2024:02:13", IQScore: 91, dailyRank: "4343/6110" },
  { date: "2024:02:14", IQScore: 90, dailyRank: "3838/6115" },
  { date: "2024:02:15", IQScore: 91, dailyRank: "555/6120" },
  { date: "2024:02:16", IQScore: 92, dailyRank: "4949/6123" },
  { date: "2024:02:17", IQScore: 93, dailyRank: "6767/6125" },
  { date: "2024:02:18", IQScore: 94, dailyRank: "7979/6128" },
  { date: "2024:02:19", IQScore: 95, dailyRank: "3838/6130" },
  { date: "2024:02:20", IQScore: 96, dailyRank: "2929/6133" },
  { date: "2024:02:21", IQScore: 97, dailyRank: "3434/6135" },
  { date: "2024:02:22", IQScore: 98, dailyRank: "4949/6138" },
  { date: "2024:02:23", IQScore: 99, dailyRank: "8383/6140" },
  { date: "2024:02:24", IQScore: 100, dailyRank: "7373/6145" },
  { date: "2024:02:25", IQScore: 99, dailyRank: "5959/6150" },
  { date: "2024:02:26", IQScore: null, dailyRank: null },
];

const IQLineGraph = () => {
  const [chartInstance, setChartInstance] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const minIQ = Math.min(
    ...contestData.map((entry) =>
      entry.IQScore ? entry.IQScore : contestData[1].IQScore
    )
  );
  const maxIQ = Math.max(
    ...contestData.map((entry) =>
      entry.IQScore ? entry.IQScore : contestData[1].IQScore
    )
  );

  const [hoveredData, setHoveredData] = useState(
    contestData[contestData.length - 2]
  );
  const [isHovering, setIsHovering] = useState(false);
  const chartRef = useRef(null);
  const handleHover = (event, array) => {
    const chart = chartRef.current;
    setIsHovering(true);
    if (array && array.length) {
      const point = array[0];
      const index = point.index;
      if (index !== hoveredIndex) {
        // Update hovered index only when index changes
        setHoveredIndex(index);
        setIsHovering(true);
        const ctx = chart.ctx;
        const x = point.element.x;
        const topY = chart.scales.y.top;
        const bottomY = chart.scales.y.bottom;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        //console.log(ctx);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "#ff9800";
        ctx.stroke();
        ctx.restore();

        const y = point.element.y;
        const radius = 8; // Adjust the size of the shadow
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "rgba(255, 152, 0, 0.2)"; // Orangish color with opacity
        ctx.fill();
        ctx.closePath();
        setHoveredData(contestData[index]);
      }
    } else {
      setHoveredData(null);
    }
  };
  const [chartData, setChartData] = useState({
    labels: contestData.map((entry) => entry.date),
    datasets: [
      {
        data: contestData.map((entry) => entry.IQScore),
        borderColor: "#ff9800", // Orangish color for the line
        pointBorderColor: "white",
        pointBackgroundColor: (context) => {
          return context.dataIndex === contestData.length - 2 && !isHovering
            ? "white"
            : "#ff9800";
        },
        backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
        borderWidth: 1, // Thin line
      },
    ],
  });

  const chartOptions = {
    animation: {
      duration: 0,
    },
    onHover: handleHover,
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
    interaction: {
      mode: "index", // Enable interaction mode for closest point
      intersect: false,
    },
    scales: {
      x: {
        ticks: {
          color: "#ccc",
          font: {
            size: 12,
          },
          callback: function (value, index, values) {
            if (index === values.length - 1 || index === 1)
              return moment(this.getLabelForValue(value), "YYYY:MM:DD").format(
                "MMM YYYY"
              );
            else return null;
          },
          min: contestData[1].date, // Set min to the second date in the data array
          max: contestData[contestData.length - 1].date, // Set max to the last date in the data array
        },
      },

      y: {
        beginAtZero: true,
        display: false,
        ticks: {
          stepSize: 0.5,
        },
        min: minIQ - 20 >= 0 ? minIQ - 20 : 0,
        max: maxIQ + 10,
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
        radius: (context) => {
          // Adjust point radius dynamically
          if (context.dataIndex === contestData.length - 2 && !isHovering) {
            return 3; // Set radius to 4 for the last point when not hovered
          } else {
            return 0; // Set radius to 0 for other points or when hovered
          }
        },
      },
    },
  };

  useEffect(() => {
    const chartCanvas = chartRef.current?.canvas;
    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoveredData(contestData[contestData.length - 2]);
    };

    if (chartCanvas) {
      chartCanvas.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (chartCanvas) {
        chartCanvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [hoveredData, isHovering]);
  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      datasets: prevChartData.datasets.map((dataset) => ({
        ...dataset,
        pointBackgroundColor: (context) => {
          return context.dataIndex === contestData.length - 2 && !isHovering
            ? "white"
            : "#ff9800";
        },
      })),
    }));
  }, [isHovering]);

  return (
    <Flex
      flexDirection={"column"}
      borderRight={"1px"}
      w={"100%"}
      paddingRight={"30px"}
    >
      <Flex justifyContent={"space-between"}>
        <Flex flexDirection={"column"}>
          <Text textAlign={"left"} color={"#eff2f699"} p={0} m={0}>
            IQ Score
          </Text>
          <Text textAlign={"left"} fontSize={"1.5rem"}>
            {hoveredData.IQScore}
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text textAlign={"left"} color={"#eff2f699"} p={0} m={0}>
            Date
          </Text>
          <Text textAlign={"left"}>
            {moment(hoveredData.date, "YYYY:MM:DD").format("MMM DD, YYYY")}
          </Text>
        </Flex>
        <Flex flexDirection={"column"}>
          <Text textAlign={"left"} color={"#eff2f699"} p={0} m={0}>
            Daily Rank
          </Text>
          <Text textAlign={"left"}>{hoveredData.dailyRank}</Text>
        </Flex>
      </Flex>
      <Flex w={"100%"} justifyContent={"center"} alignItems={"center"}>
        <Line ref={chartRef} data={chartData} options={chartOptions} />
      </Flex>
    </Flex>
  );
};

export default IQLineGraph;
