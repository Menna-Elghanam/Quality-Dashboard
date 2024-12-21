import React from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import Heatmap from "../components/Heatmap";
import data from "../data/factory_output_stream_full_year.json";

function Dashboard() {
  return (
    <div className="h-screen  ">
      {/* Logo will be Here */}

      {/* First Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Video Section */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Video Section</h2>
          <div className="aspect-w-16 aspect-h-9">
            <video className="w-full h-full" controls>
              <source src="path-to-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Card with Numeric Data */}

        <div className="bg-white shadow rounded-lg  space-y-6">
          {/* First Row */}
          <div className="border rounded-lg  flex justify-between items-stretch  ">
            {/* Column 1: Numeric Data */}
            <div className="w-1/2 pr-4 bg-[#FF6A55] rounded-l-lg text-white p-8 flex flex-col items-center justify-center h-full">
              <img src="/bug.png" alt="Bug Icon" className="w-16 h-16 mb-6" />
              <h2 className="text-2xl font-bold mb-4">Total Defects</h2>
              <p className="text-4xl font-extrabold">{data.filter((item) => item.Category === "Defect").length}</p>
            </div>

            {/* Column 2: Additional Data */}
            <div className="w-1/2 flex flex-col justify-between py-4">
              <div className="flex items-center gap-6 p-6 rounded-lg">
                <img
                  src="/Group 44.png"
                  alt="Holes Icon"
                  className="w-12 h-12"
                />
                <div className="flex gap-3">
                  <p className="text-3xl font-extrabold text-[#FF6A55]">{data.filter((item) => item.Type === "Holes").length}</p>
                  <h2 className="text-xl font-bold text-gray-700">
                    Total Holes
                  </h2>
                </div>
              </div>

              <hr className="border-gray-300" />

              <div className="flex items-center gap-6 p-6 rounded-lg">
                <img
                  src="/Group 48.png"
                  alt="Folding Icon"
                  className="w-12 h-12"
                />
                <div className="flex gap-3">
                  <p className="text-3xl font-extrabold text-[#FF6A55]">{data.filter((item) => item.Type === "Folding").length}</p>
                  <h2 className="text-xl font-bold text-gray-700">
                    Total Folding
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 gap-6 h-[200px]">
            {/* Small Card 1 */}
            <div className="bg-[#E6B454] shadow-lg rounded-lg p-8 text-white flex items-center gap-6 h-full">
              <img src="/Group 44 (1).png" alt="" className="w-16 h-16" />
              <div>
                <p className="text-xl font-medium mb-2">Warning</p>
                <h2 className="text-4xl font-extrabold">{data.filter((item) => item.Category === "Warning").length}</h2>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="bg-[#33B8B0] shadow-lg rounded-lg p-8 text-white flex items-center gap-6 h-full">
              <img src="/fi-rr-shield-check.png" alt="" className="w-16 h-16" />
              <div>
                <p className="text-xl font-medium mb-2">Clean Days</p>
                <h2 className="text-4xl font-extrabold">8</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Card 1 */}
        <div className="bg-white shadow rounded-lg p-4 ">
          <h2 className="text-lg font-bold mb-2">Line Chart</h2>
          <LineChart data={data} />
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Pie Chart</h2>
          <PieChart data={data} />
        </div>
      </div>

      {/* Third Row */}
      <div>
        <div className="bg-white shadow rounded-lg p-4">
          <Heatmap rawData={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
