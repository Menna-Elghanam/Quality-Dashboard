import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {



  // Process data for the Pie chart (Count categories)
  const typeCounts = data.reduce((acc, item) => {
    acc[item.Type] = (acc[item.Type] || 0) + 1;
    return acc;
  }, {});

  // Prepare the chart data
  const chartData = {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: ["#FFC350", "#006083", "#00AEEF"],
      },
    ],
  };
  // Chart options
  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 12,
          padding: 10,
        },
      },
    },
  };
  return (
    <div className="flex flex-col items-center ">
      <div className="w-72 h-72">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
