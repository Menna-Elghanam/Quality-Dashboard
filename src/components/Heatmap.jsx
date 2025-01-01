import React, { useEffect, useRef, useState } from "react";
import { HeatMapGrid } from "react-grid-heatmap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { get } from "../services/http";
import Loader from "./Loader";


const Heatmap = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [weekOffset, setWeekOffset] = useState(0);
  const [heatMapData, setHeatMapData] = useState([[]]);
  const [loading, setLoading] = useState();


  useEffect(() => {
    const fetchHeatMap = async () => {
      try {
        setLoading(true);
        const response = await get("/api/defects/heatmap", {
          week: weekOffset,
        });

        if (!response) {
          throw new Error("No response from server");
        }
        setHeatMapData(response);
        setLoading(false);


        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    }
    fetchHeatMap();
  }, [weekOffset]);

  return (
    <div className="w-full relative">
      <Loader isLoading={loading}/>
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
            onChange={setSelectedMonth}
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
      <div className="w-full px-8 md:px-12 overflow-x-auto">
        <div className="min-w-[768px] w-full">
          <HeatMapGrid
            data={heatMapData.counts ? heatMapData.counts : []}
            xLabels={heatMapData.hours}
            yLabels={heatMapData.daysOfWeek}
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
              // marginRight: "16px",
              fontWeight: "500",
              marginBottom: "5px",
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
