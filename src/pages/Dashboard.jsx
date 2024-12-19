import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="h-screen overflow-y-auto bg-gray-100">
      {/* Navigation Tabs */}
      <div className="sticky top-0 bg-white shadow-md z-10 p-4 flex justify-center">
        <Link to="/">
          <button>Home</button>
        </Link>
        <Link to="/records">
          <button>Records</button>
        </Link>
      </div>

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

        <div className="bg-white shadow rounded-lg p-6 space-y-6">
          {/* First Row */}
          <div className="border rounded-lg p-6 flex justify-between items-start gap-6">
            {/* Column 1: Numeric Data */}
            <div className="w-1/2 pr-4 bg-[#FF6A55] rounded-lg text-white p-4 flex flex-col items-center justify-center">
              <img src="/bug.png" alt="Bug Icon" className="w-12 h-12 mb-4" />
              <h2 className="text-xl font-bold mb-2">Total Defects</h2>
              <p className="text-3xl font-extrabold">12</p>
            </div>

            {/* Column 2: Additional Data */}
            <div className="w-1/2 space-y-4">
              <div className="flex items-center gap-4  p-4 rounded-lg">
                <img
                  src="/Group 44.png"
                  alt="Holes Icon"
                  className="w-10 h-10"
                />
                <div className="flex gap-2 ">
                  <p className="text-2xl font-extrabold text-[#FF6A55]">10</p>
                  <h2 className="text-lg font-bold text-gray-700">
                    Total Holes
                  </h2>
                </div>
              </div>
              <hr className="my-4 border-gray-300" />

              <div className="flex items-center gap-4  p-4 rounded-lg">
                <img
                  src="/Group 48.png"
                  alt="Folding Icon"
                  className="w-10 h-10"
                />
                <div className="flex gap-2 ">
                  <p className="text-2xl font-extrabold text-[#FF6A55]">10</p>
                  <h2 className="text-lg font-bold text-gray-700">
                    Total Folding
                  </h2>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-2 gap-6">
            {/* Small Card 1 */}
            <div className="bg-[#E6B454] shadow-lg rounded-lg p-6 text-white flex items-center gap-4">
              <img src="/Group 44 (1).png" alt="" />

              <div>
                <p className="text-lg font-medium">Warning</p>

                <h2 className="text-3xl font-extrabold">7</h2>
              </div>
            </div>

            {/* Small Card 2 */}
            <div className="bg-[#33B8B0] shadow-lg rounded-lg p-6 text-white flex items-center gap-4">
              <img src="/fi-rr-shield-check.png" alt="" />
              <div>
                <p className="text-lg font-medium">Clean Days</p>

                <h2 className="text-3xl font-extrabold">8</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        {/* Card 1 */}
        <div className="bg-white shadow rounded-lg p-4 h-80">
          <h2 className="text-lg font-bold mb-2">Card 1</h2>
          <p>Content for the first card.</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Card 2</h2>
          <p>Content for the second card.</p>
        </div>
      </div>

      {/* Third Row */}
      <div className="p-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Full Width Card</h2>
          <p>Heat map</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
