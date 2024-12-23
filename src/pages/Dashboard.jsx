import React from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import Heatmap from "../components/Heatmap";
import data from "../data/factory_output_stream_full_year.json";

function Dashboard() {
  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-gray-100">
      {/* First Row */}
      <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Video Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="aspect-w-16 aspect-h-9">
            <video className="w-full h-full" controls>
              <source src="path-to-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Card with Numeric Data */}
        <div className="  rounded-lg space-y-6 p-6 ">
          <div className=" rounded-lg flex flex-wrap lg:flex-nowrap justify-between items-stretch bg-white">
            {/* Column 1: Numeric Data */}
            <div className="flex-1 bg-[#FF6A55] rounded-l-lg text-white p-6 flex flex-col items-center justify-center">
              <img src="/bug.png" alt="Bug Icon" className="w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Total Defects</h2>
              <p className="text-4xl font-extrabold">
                {data.filter((item) => item.Category === "Defect").length}
              </p>
            </div>

            {/* Column 2: Additional Data */}
            <div className="flex-1 flex flex-col justify-between py-4 px-6  rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/Group 44.png"
                  alt="Holes Icon"
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-3xl font-extrabold text-[#FF6A55]">
                    {data.filter((item) => item.Type === "Holes").length}
                  </p>
                  <h2 className="text-lg font-bold text-gray-700">
                    Total Holes
                  </h2>
                </div>
              </div>

              <hr className="border-gray-300" />

              <div className="flex items-center gap-4 mt-4">
                <img
                  src="/Group 48.png"
                  alt="Folding Icon"
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-3xl font-extrabold text-[#FF6A55]">
                    {data.filter((item) => item.Type === "Folding").length}
                  </p>
                  <h2 className="text-lg font-bold text-gray-700">
                    Total Folding
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Small Card 1 */}
            <div className="bg-[#E6B454] rounded-lg p-6 text-white flex items-center gap-4 h-44 shadow-[#E6B45499] shadow-lg">
              <img
                src="/Group 44 (1).png"
                alt="Warning Icon"
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-medium">Warning</p>
                <h2 className="text-3xl font-extrabold">
                  {data.filter((item) => item.Category === "Warning").length}
                </h2>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="bg-[#33B8B0]  rounded-lg p-6 text-white flex items-center gap-4 shadow-[#33B8B099] shadow-lg">
              <img
                src="/fi-rr-shield-check.png"
                alt="Clean Days Icon"
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-medium">Clean Days</p>
                <h2 className="text-3xl font-extrabold">8</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Line Chart */}
        <div className="bg-white shadow rounded-lg p-6 h-[400px] md:h-[500px]">
          <h2 className="text-xl font-bold mb-4">Line Chart</h2>
          <LineChart data={data} />
        </div>

        {/* Pie Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Pie Chart</h2>
          <PieChart data={data} />
        </div>
      </div>

      {/* Third Row */}
      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <Heatmap rawData={data} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
