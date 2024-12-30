import React, { useEffect, useRef, useState } from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { get, post } from "../services/http";

// Helper function to process data by hour and day within the selected month and week


// const processData = (data, selectedMonth, weekOffset) => {
//   const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
//   const yLabels = [];

//   const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 1);
//   const startOfWeek = new Date(firstDayOfMonth);
//   startOfWeek.setDate(firstDayOfMonth.getDate() + weekOffset * 7);
//   startOfWeek.setHours(0, 0, 0, 0);

//   const endOfWeek = new Date(startOfWeek);
//   endOfWeek.setDate(startOfWeek.getDate() + 6);
//   endOfWeek.setHours(23, 59, 59, 999);

//   for (
//     let d = new Date(startOfWeek);
//     d <= endOfWeek;
//     d.setDate(d.getDate() + 1)
//   ) {
//     yLabels.push(
//       `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`
//     );
//   }

//   const result = new Array(yLabels.length)
//     .fill(0)
//     .map(() => new Array(xLabels.length).fill(0));

//   data.forEach((item) => {
//     const date = new Date(item.DateTimestamp);
//     if (
//       item.Category === "Defect" &&
//       date >= startOfWeek &&
//       date <= endOfWeek &&
//       date.getMonth() === selectedMonth
//     ) {
//       const hour = date.getHours();
//       const dayIndex = Math.floor((date - startOfWeek) / (1000 * 60 * 60 * 24));
//       if (dayIndex >= 0 && dayIndex < yLabels.length) {
//         result[dayIndex][hour]++;
//       }
//     }
//   });

//   return { xLabels, yLabels, result };
// };

const Heatmap = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [weekOffset, setWeekOffset] = useState(0);
  const [heatMapData, setHeatMapData] = useState([[]]);

  // const {
  //   xLabels,
  //   yLabels,
  //   result: data,
  // } = processData(rawData, selectedMonth, weekOffset);

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(Number(event.target.value));
  //   setWeekOffset(0);
  // };

  useEffect(() => {
    const fetchHeatMap = async () => {
      try {
        const response = await get("/api/defects/heatmap");
        


        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchHeatMap();
  }, []);

  return (
    <div className="w-full relative">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-4">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0">Defect Heatmap</h2>

        {/* Month Filter */}
        <div className="flex items-center">
          <label
            htmlFor="month-select"
            className="mr-3 text-sm font-medium text-gray-700"
          >
            Select Month:
          </label>
          <select
            id="month-select"
            value={selectedMonth}
            // onChange={handleMonthChange}
            className="p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Navigation Buttons - Adjusted positioning */}
      <div></div>
      <button
        onClick={() => setWeekOffset((prev) => prev - 1)}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 shadow-md z-10 transition-colors duration-200"
      >
        <FaChevronLeft className="w-4 h-4 text-gray-700" />
      </button>
      <button
        onClick={() => setWeekOffset((prev) => prev + 1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-3 shadow-md z-10 transition-colors duration-200"
      >
        <FaChevronRight className="w-4 h-4 text-gray-700" />
      </button>

      {/* Heatmap Container - Improved width handling */}
      <div className="w-full px-8 md:px-12 overflow-x-auto">
        <div className="min-w-[768px] w-full">
          <HeatMapGrid
            data={heatMapData}
            // xLabels={xLabels}
            // yLabels={yLabels}
            cellRender={(x, y, value) => (
              <div className="flex items-center justify-center w-full h-full">
                {value ? value : 0}
              </div>
            )}
            xLabelsStyle={(index) => ({
              color: "#777",
              fontSize: "0.875rem",
              marginLeft: "4px",
              fontWeight: "500",
            })}
            yLabelsStyle={() => ({
              fontSize: "0.75rem",
              textTransform: "uppercase",
              color: "#777",
              marginRight: "16px",
              fontWeight: "500",
              marginTop: "px",
            })}
            cellStyle={(_x, _y, ratio) => ({
              // background: calculateColor(ratio),
              background : `rgba(255, 106, 85,${isNaN(ratio) ? 0.1 :ratio /1.1 + 0.2 } )`,
              fontWeight: "bold",
              fontSize: "0.875rem",
              margin: "2px",
              borderRadius: "4px",
              transition: "transform 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.1)",
              },
            })}
            cellHeight="3rem"
            xLabelsPos="bottom"
            yLabelsPos="left"
            square
          />
        </div>
      </div>
    </div>
  );
};

export default Heatmap;
