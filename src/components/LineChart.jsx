import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  // Process the data to group counts by month and category
  const processChartData = (data) => {
    const monthlyCounts = {
      Defect: Array(12).fill(0),
      Warning: Array(12).fill(0),
    };

    data.forEach((item) => {
      const month = new Date(item.DateTimestamp).getMonth(); // Extract month (0-11)
      if (item.Category === "Defect") {
        monthlyCounts.Defect[month] += 1;
      } else if (item.Category === "Warning") {
        monthlyCounts.Warning[month] += 1;
      }
    });

    return monthlyCounts;
  };

  const chartData = processChartData(data);

  // Define the data for the chart
  const lineChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Defects",
        data: chartData.Defect,
        borderColor: "#038C8C",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
      {
        label: "Warnings",
        data: chartData.Warning,
        borderColor: "#022859",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderWidth: 2,
        tension: 0.4, // Smooth line
      },
    ],
  };

// Define chart options
const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    }
  },
  scales: {
    x: {
      grid: {
        display: false, // Remove vertical grid lines
      },
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      grid: {
        drawBorder: false,
        color: (context) => (context.index % 2 === 0 ? "#f0f0f0" : "#e0e0e0"), // Alternating grid lines
        drawTicks: true,
      },
      title: {
        display: true,
        text: "Count",
      },
    },
  },
};


  return (
    <div style={{ width: "100%", margin: "0 auto" }}>
      <Line data={lineChartData} options={options} />
    </div>
  );
};

export default LineChart;




// import React from "react";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";

// // Register chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// const LineChart = ({ data }) => {
//   // Process the data to group counts by month and category
//   const processChartData = (data) => {
//     const monthlyCounts = {
//       Defect: Array(12).fill(0),
//       Warning: Array(12).fill(0),
//     };

//     data.forEach((item) => {
//       const month = new Date(item.DateTimestamp).getMonth(); // Extract month (0-11)
//       if (item.Category === "Defect") {
//         monthlyCounts.Defect[month] += 1;
//       } else if (item.Category === "Warning") {
//         monthlyCounts.Warning[month] += 1;
//       }
//     });

//     // Adjust "Warning" values to be cumulative above "Defect"
//     const cumulativeWarnings = monthlyCounts.Warning.map(
//       (count, index) => count + monthlyCounts.Defect[index]
//     );

//     return {
//       Defect: monthlyCounts.Defect,
//       Warning: cumulativeWarnings,
//     };
//   };

//   const chartData = processChartData(data);

//   // Define the data for the chart
//   const lineChartData = {
//     labels: [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ],
//     datasets: [
//       {
//         label: "Defects",
//         data: chartData.Defect,
//         borderColor: "#022859",
//         backgroundColor: "#EAFAFE",
//         borderWidth: 2,
//         tension: 0.4, // Smooth line
//         fill: true, // Fill the area under the line
//       },
//       {
//         label: "Warnings",
//         data: chartData.Warning,
//         borderColor: "#038C8C",
//         backgroundColor: "#F5FEF8",
//         borderWidth: 2,
//         tension: 0.4, // Smooth line
//         fill: true, // Fill the area under the line
//       },
//     ],
//   };

//   // Define chart options
//   const options = {
//     responsive: true,
//       maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//     scales: {
//       y: {
//         stacked: true, // Stack the areas
//         title: {
//           display: true,
//           text: "Count",
//         },
//       },
//       x: {
//         grid: {
//           display: false, // Remove vertical grid lines
//         },
//         title: {
//           display: true,
//           text: "Month",
//         },
//       },
//     },
//   };

//   return (
//     <div style={{ width: "100%",height:"300px", margin: "0 auto" }}>
//       <Line data={lineChartData} options={options} />
//     </div>
//   );
// };

// export default LineChart;
