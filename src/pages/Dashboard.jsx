import React, { useState, useEffect } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import Heatmap from "../components/Heatmap";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/http";

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("year");
  const [filteredData, setFilteredData] = useState([]);
  const [imageStreaming, setImageStreaming] = useState("");
  const [defects, setDefects] = useState({
    total: 0,
    holes: 0,
    folding: 0,
    warning: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await get("/api/config");
      setImageStreaming(res.stream_url);
    };
    fetchConfig();
    const eventSourceRef = new EventSource(
      import.meta.env.VITE_BACKEND_URL +
        "/api/stream" +
        `?timeframe=${selectedFilter}`
    );

    eventSourceRef.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDefects(newData);
    };

    eventSourceRef.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSourceRef.close();
    };

    return () => {
      eventSourceRef.close();
    };
  }, [selectedFilter]);

  return (
    <>
      <div className="h-[calc(100vh-4rem)] p-3 bg-[#F3F3F3] flex flex-col gap-3">
        {/* Filter Bar */}
        <div className="flex justify-end">
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" variant="flat" className="capitalize">
                Filter : {selectedFilter}
                <img
                  src="/fi-rr-caret-down.png"
                  alt="dropdown"
                  className="w-3 h-3"
                />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Time period selection"
              onAction={(key) => setSelectedFilter(key)}
            >
              <DropdownItem key="week">This Week</DropdownItem>
              <DropdownItem key="month">This Month</DropdownItem>
              <DropdownItem key="year">This Year</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Content Container */}
        <div className="flex-1 flex flex-col gap-3">
          {/* First Row - Video Stream and Stats */}
          <div className="flex gap-3 h-[55%]">
            {/* Video Stream */}
            <div className="flex-[2] bg-white rounded-lg p-2">
              {imageStreaming ? (
                <img
                  title="Video Stream"
                  className="w-full h-full object-cover rounded-lg"
                  src={imageStreaming}
                  alt="stream"
                />
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-yellow-700 font-medium text-sm">
                    No image stream available. Please go to configurations and
                    set it up.
                  </p>
                </div>
              )}
            </div>

            {/* Stats Cards */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Total Defects Card */}
              <div className="flex-1 bg-white rounded-lg grid grid-cols-5">
                <div className="col-span-2 bg-[#FF6A55] rounded-l-lg text-white p-3 flex flex-col items-center justify-center">
                  <img
                    src="/bug.png"
                    alt="Bug Icon"
                    className="w-12 h-12 mb-2"
                  />
                  <h2 className="text-2xl font-bold">Total Defects</h2>
                  <p className="text-4xl font-bold">{defects.total}</p>
                </div>
                <div className="col-span-3 p-3 flex flex-col justify-center space-y-4">
                  <div className="flex items-center  gap-5">
                    <img
                      src="/Group 44.png"
                      alt="Holes Icon"
                      className="w-10 h-10 mx-2"
                    />
                    <div>
                      <p className="text-xl font-bold text-[#FF6A55]">
                        {defects.holes}
                      </p>
                      <h3 className="text-xl font-medium text-gray-700">
                        Total Holes
                      </h3>
                    </div>
                  </div>
                  <hr />
                  <div className="flex items-center gap-5">
                    <img
                      src="/Group 48.png"
                      alt="Folding Icon"
                      className="w-10 h-10 mx-2"
                    />
                    <div>
                      <p className="text-xl font-bold text-[#FF6A55]">
                        {defects.folding}
                      </p>
                      <h3 className="text-xl font-medium text-gray-700">
                        Total Folding
                      </h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warning and Clean Days Cards */}
              <div className="grid grid-cols-2 gap-2 flex-1">
                <div className="bg-[#E6B454] rounded-lg p-3 text-white flex items-center">
                  <div className="flex items-center gap-6">
                    <img
                      src="/Group 44 (1).png"
                      alt="Warning Icon"
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="text-2xl font-medium">Warning</p>
                      <h2 className="text-5xl font-bold m-2">{defects.warning}</h2>
                    </div>
                  </div>
                </div>
                <div className="bg-[#33B8B0] rounded-lg p-3 text-white flex items-center">
                  <div className="flex items-center gap-3">
                    <img
                      src="/fi-rr-shield-check.png"
                      alt="Clean Days Icon"
                      className="w-14 h-14"
                    />
                    <div>
                      <p className="text-2xl font-medium">Clean Days</p>
                      <h2 className="text-5xl font-bold mx-5">
                        {
                          new Set(
                            filteredData
                              .filter(
                                (item) =>
                                  item.category !== "Defect" &&
                                  item.category !== "Warning"
                              )
                              .map((item) => item.timestamp.split(" ")[0])
                          ).size
                        }
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Charts */}
          <div className="flex gap-3 h-[40%]">
            {/* Line Chart */}
            <div className="flex-[2] bg-white rounded-lg p-3">
              <h2 className="text-base font-bold mb-2">Defects Over Time</h2>
              <div className="h-[calc(100%-2rem)]">
                <LineChart data={defects} />
              </div>
            </div>

            {/* Pie Chart */}
            <div className="flex-1 bg-white rounded-lg p-3">
              <h2 className="text-base font-bold mb-2">Defect Distribution</h2>
              <div className="h-[calc(100%-2rem)]">
                <PieChart data={defects} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#F3F3F3] p-3">
        <div className="bg-white rounded-lg p-6">
          <Heatmap />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
