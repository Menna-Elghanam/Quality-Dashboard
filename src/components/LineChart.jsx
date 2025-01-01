import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ data }) => {
  const processChartData = (defects) => {
    if (!defects || typeof defects !== "object") {
      return { labels: [], defectsData: [], warningsData: [] };
    }

    const labels = moment.monthsShort();
    const defectsData = Array(12).fill(0);
    const warningsData = Array(12).fill(0);

    const defectEntries = [
      {
        timestamp: new Date().toISOString(),
        category: "Defect",
        count: defects.total || 0,
      },
      {
        timestamp: new Date().toISOString(),
        category: "Warning",
        count: defects.warning || 0,
      },
    ];

    defectEntries.forEach((item) => {
      const monthIndex = moment(item.timestamp).month();
      if (item.category === "Defect") {
        defectsData[monthIndex] += item.count;
      } else if (item.category === "Warning") {
        warningsData[monthIndex] += item.count;
      }
    });

    return { labels, defectsData, warningsData };
  };

  const chartData = processChartData(data);

  const lineChartData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Defects",
        data: chartData.defectsData,
        borderColor: "#FF6A55",
        backgroundColor: "rgba(255, 106, 85, 0.5)",
        pointStyle: "circle",
        pointRadius: 4,
        tension: 0.4,
      },
      {
        label: "Warnings",
        data: chartData.warningsData,
        borderColor: "#E6B454",
        backgroundColor: "rgba(230, 180, 84, 0.5)",
        pointStyle: "circle",
        pointRadius: 4,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "end",
        labels: {
          boxWidth: 10,
          padding: 8,
          font: {
            size: 12,
            family: "Arial, sans-serif",
          },
        },
      },
      tooltip: {
        padding: 8,
        bodyFont: { size: 12 },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return <Line data={lineChartData} options={options} />;
};

export default LineChart;
