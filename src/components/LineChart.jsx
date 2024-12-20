



import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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

// Register the necessary chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetch("/src/data/dummy.json")
      .then((response) => response.json())
      .then((data) => setDataList(data))
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  // Process data to group by month and category
  const getCountsByMonth = () => {
    const counts = {
      Warning: {},
      Defect: {},
    };

    dataList.forEach((item) => {
      const month = new Date(item.DateTimestamp).toLocaleString("default", {
        month: "long",
      });

      if (!counts[item.Category][month]) {
        counts[item.Category][month] = 0;
      }
      counts[item.Category][month] += 1;
    });

    return counts;
  };

  // Prepare chart data based on counts
  const counts = getCountsByMonth();
  const months = Object.keys(counts.Warning); // Assuming all categories have the same months
  const chartData = {
    labels: months, // X-axis labels (Months)
    datasets: [
      {
        label: "Warning",
        data: months.map((month) => counts.Warning[month] || 0),
        borderColor: "#FFC350",
        backgroundColor: "rgba(255, 195, 80, 0.2)",
        fill: true,
        tension: 0.3, // Smoother line
        pointRadius: 5, // Add points to the line
        pointBackgroundColor: "#FFC350",
      },
      {
        label: "Defect",
        data: months.map((month) => counts.Defect[month] || 0),
        borderColor: "#006083",
        backgroundColor: "rgba(0, 96, 131, 0.2)",
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointBackgroundColor: "#006083",
      },
    ],
  };

  return (
    <div >
        <Line style={{width:'100%' }} data={chartData} options={{
          responsive: true,
          plugins: {
            tooltip: {
              backgroundColor: '#333',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#fff',
              borderWidth: 1,
            },
            legend: {
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'bold',
                },
                boxWidth: 14,
                padding: 20,
              },
            },
          },
          scales: {
            
            x: {
              title: {
                display: true,
                text: 'Month',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
              ticks: {
                font: {
                  size: 12,
                  weight: '500',
                },
              },
            },
            y: {
              title: {
                display: true,
                text: 'Count',
                font: {
                  size: 16,
                  weight: 'bold',
                },
              },
              ticks: {
                font: {
                  size: 12,
                  weight: '500',
                },
                stepSize: 1,
              },
              grid: {
                display: false, // Hides the grid behind the y-axis
              },
            },
          },
        }} />
    </div>
  );
};

export default LineChart;



