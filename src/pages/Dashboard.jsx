import React, { useState, useEffect, useRef } from "react";
import PieChart from "../components/PieChart";
import LineChart from "../components/LineChart";
import Heatmap from "../components/Heatmap";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Image,
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
      console.log(defects);
    };

    eventSourceRef.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSourceRef.close();
    };

    return () => {
      eventSourceRef.close();
    };
  }, [selectedFilter]);

  // const filterData = async (timeframe, data = factoryData) => {
  //   setSelectedFilter(timeframe);

  //   // // Fetch defect counts from the backend
  //   // try {
  //   //   const defectCounts = await get(`/api/defects?timeframe=${timeframe}`);
  //   //   setDefects(defectCounts);
  //   // } catch (error) {
  //   //   console.error("Error fetching defect counts:", error);
  //   // }

  //   // // Close previous eventSource and create a new one
  //   // if (eventSourceRef) {
  //   //   eventSourceRef.close();
  //   // }
  //   // eventSourceRef = new EventSource(
  //   //   import.meta.env.VITE_BACKEND_URL + "/api/stream?" + `timeframe=${timeframe}`
  //   // );

  //   // eventSourceRef.onmessage = (event) => {
  //   //   const newData = JSON.parse(event.data);
  //   //   setDefects(newData);
  //   // };
  // };

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-[#F3F3F3]">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 rounded-lg">
          <div className="aspect-w-16 aspect-h-9 mb-5">
            {imageStreaming ? (
              <img
                title="Video Stream"
                className="w-full h-[500px] rounded-lg"
                src={imageStreaming}
              />
            ) : (
              <div className="text-center p-4 rounded-lg flex items-center justify-center h-[500px]">
                <p className="text-yellow-700 font-medium">
                  No image stream available. Please go to configurations and set
                  it up.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="flat" className="capitalize">
                Filter : {selectedFilter}
                <img src="/fi-rr-caret-down.png" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Time period selection"
              onAction={(key) => {
                setSelectedFilter(key);
              }}
            >
              <DropdownItem key="week">This Week</DropdownItem>
              <DropdownItem key="month">This Month</DropdownItem>
              <DropdownItem key="year">This Year</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className="rounded-lg flex flex-wrap lg:flex-nowrap justify-between items-stretch bg-white">
            <div className="flex-1 bg-[#FF6A55] rounded-l-lg text-white p-6 flex flex-col items-center justify-center">
              <img src="/bug.png" alt="Bug Icon" className="w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Total Defects</h2>
              <p className="text-4xl font-extrabold">{defects.total}</p>
            </div>

            <div className="flex-1 flex flex-col justify-between py-4 px-6 rounded-lg">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="/Group 44.png"
                  alt="Holes Icon"
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-3xl font-extrabold text-[#FF6A55]">
                    {defects.holes}
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
                    {defects.folding}
                  </p>
                  <h2 className="text-lg font-bold text-gray-700">
                    Total Folding
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#E6B454] rounded-lg p-6 text-white flex items-center gap-4 h-44 shadow-[#E6B45499] shadow-lg">
              <img
                src="/Group 44 (1).png"
                alt="Warning Icon"
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-medium">Warning</p>
                <h2 className="text-3xl font-extrabold">{defects.warning}</h2>
              </div>
            </div>

            <div className="bg-[#33B8B0] rounded-lg p-6 text-white flex items-center gap-4 shadow-[#33B8B099] shadow-lg">
              <img
                src="/fi-rr-shield-check.png"
                alt="Clean Days Icon"
                className="w-12 h-12"
              />
              <div>
                <p className="text-lg font-medium">Clean Days</p>
                <h2 className="text-3xl font-extrabold">
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

      <div className="grid grid-cols-12 gap-6 mb-6 shadow-lg">
        <div className="col-span-12 lg:col-span-8 bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Line Chart</h2>
          <LineChart data={filteredData} />
        </div>

        <div className="col-span-12 lg:col-span-4 bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Pie Chart
          </h2>
          <div className="flex justify-center items-center">
            <PieChart data={defects} />

          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <Heatmap   />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
