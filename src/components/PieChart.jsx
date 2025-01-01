import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ["#FFC350", "#006083", "#00AEEF"],
        borderWidth: 1,
        borderColor: "#ffffff",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 10,
          padding: 8,
          font: {
            size: 11,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        padding: 8,
        bodyFont: { size: 11 },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default PieChart;
