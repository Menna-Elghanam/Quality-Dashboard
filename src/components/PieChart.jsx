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


  // Prepare the chart data
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#FFC350", "#006083", "#00AEEF"],
        borderWidth: 1,
        borderColor: "#ffffff", // Add white borders between segments
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
          font: {
            size: 14, // Larger font size for better readability
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 16, family: "Arial, sans-serif" },
        bodyFont: { size: 14 },
        padding: 10,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-80 h-80 md:w-96 md:h-96">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PieChart;
