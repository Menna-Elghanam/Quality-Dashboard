import React, { useRef, useState } from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Helper function to process data by hour and day within the selected month and week

const calculateColor = (value) => {
  if( isNaN(value) || value == 0){
    return `rgb(118, 128,128)`;
  }
  const max = 1; // Define the maximum value
  const percentage = Math.min(value / max, 1); // Ensure percentage doesn't exceed 1

  // Color stops (RGB values)
  const colors = [
    { r: 0, g: 128, b: 255 }, // Blue
    { r: 0, g: 200, b: 100 }, // Green
    { r: 255, g: 200, b: 0 }, // Yellow
    { r: 255, g: 100, b: 0 }, // Orange
  ];

  // Interpolate colors based on percentage
  const step = percentage * (colors.length - 1);
  const index = Math.floor(step); // Lower bound of the range
  const t = step - index; // Fraction between the two stops
  const c1 = colors[index];
  const c2 = colors[Math.min(index + 1, colors.length - 1)];

  const r = Math.round(c1.r + t * (c2.r - c1.r));
  const g = Math.round(c1.g + t * (c2.g - c1.g));
  const b = Math.round(c1.b + t * (c2.b - c1.b));

  return `rgb(${r}, ${g}, ${b})`;
};
const processData = (data, selectedMonth, weekOffset) => {
  const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
  const yLabels = [];

  const firstDayOfMonth = new Date(new Date().getFullYear(), selectedMonth, 1);
  const startOfWeek = new Date(firstDayOfMonth);
  startOfWeek.setDate(firstDayOfMonth.getDate() + weekOffset * 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  for (
    let d = new Date(startOfWeek);
    d <= endOfWeek;
    d.setDate(d.getDate() + 1)
  ) {
    yLabels.push(
      `${d.getDate()} ${d.toLocaleString("default", { month: "short" })}`
    );
  }

  const result = new Array(yLabels.length)
    .fill(0)
    .map(() => new Array(xLabels.length).fill(0));

  data.forEach((item) => {
    const date = new Date(item.DateTimestamp);
    if (
      item.Category === "Defect" &&
      date >= startOfWeek &&
      date <= endOfWeek &&
      date.getMonth() === selectedMonth
    ) {
      const hour = date.getHours();
      const dayIndex = Math.floor((date - startOfWeek) / (1000 * 60 * 60 * 24));
      if (dayIndex >= 0 && dayIndex < yLabels.length) {
        result[dayIndex][hour]++;
      }
    }
  });


  return { xLabels, yLabels, result };
};

const Heatmap = ({ rawData }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [weekOffset, setWeekOffset] = useState(0);

  const {
    xLabels,
    yLabels,
    result: data,
  } = processData(rawData, selectedMonth, weekOffset);

  const handleMonthChange = (event) => {
    setSelectedMonth(Number(event.target.value));
    setWeekOffset(0);
  };


  return (
    <div className="w-full p-4 relative">
      <h2 className="text-xl font-bold mb-4 text-start">Defect Heatmap</h2>

      {/* Month Filter */}
      <div className=" flex justify-end items-end">
        <label
          htmlFor="month-select"
          className="m-2 text-sm font-medium text-gray-700"
        >
          Select Month:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="p-2 border border-gray-300 rounded-md text-sm"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => setWeekOffset((prev) => prev - 1)}
        className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        <FaChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      <button
        onClick={() => setWeekOffset((prev) => prev + 1)}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 rounded-full p-2 shadow-md"
      >
        <FaChevronRight className="w-5 h-5 text-gray-700" />
      </button>

      {/* Heatmap */}
      <div className="flex justify-center items-center ">
        {" "}
        <HeatMapGrid 
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(x, y, value) => (
            <div
              // title={`Hour: ${x}, Date: ${yLabels[y]} | Total Defects: ${value}`}
            >
              {value ? value : 0}
            </div>
          )}
          xLabelsStyle={(index) => ({
            color:"#777",
            fontSize: ".8rem",
            marginTop : "10px"

          })}
          yLabelsStyle={() => ({
            fontSize: ".7rem",
            textTransform: "uppercase",
            color: "#777",
            marginRight : "10px"
          })}
          cellStyle={(_x, _y, ratio) => ({
            // background: isNaN(ratio) ? null : `rgb(12, 160, 44, ${ratio})`,
            background: calculateColor(ratio),
            // background: `rgb(12, 160, 44, ${ratio})`,
            fontSize: '.8rem',
            color: `rgb(0, 0, 0, ${isNaN(ratio) ?  0 /2 + 0.4 : ratio  / 2 + 0.4})`
          })}
          cellHeight="2.6rem"
          xLabelsPos="bottom"
          yLabelsPos="left"
          square
        />
      </div>
    </div>
  );
};

export default Heatmap;
