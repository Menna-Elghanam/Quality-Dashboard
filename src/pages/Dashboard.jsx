// import React, { useState, useLayoutEffect } from "react";
// import PieChart from "../components/PieChart";
// import LineChart from "../components/LineChart";
// import Heatmap from "../components/Heatmap";
// import {
//   Dropdown,
//   DropdownTrigger,
//   DropdownMenu,
//   DropdownItem,
//   Button,
//   Image,
// } from "@nextui-org/react";
// import data from "../data/factory_output_stream_full_year.json";
// import { useNavigate } from "react-router-dom";
// import { get } from "../services/http";

// function Dashboard() {
//   const [selectedFilter, setSelectedFilter] = useState("year");
//   const [filteredData, setFilteredData] = useState(data);

//   const [imageStreaming, setImageStreaming] = useState("");
//   const navigate = useNavigate();

//   useLayoutEffect(() => {
//     (async () => {
//       const res = await get("/api/config");
//       setImageStreaming(res.stream_url);
//     })();

//     const eventSource = new EventSource(import.meta.env.VITE_BACKEND_URL + "/api/stream");
//   }, []);

//   const filterData = (timeframe) => {
//     const currentDate = new Date();
//     const filteredResults = data.filter((item) => {
//       const itemDate = new Date(item.timestamp);

//       switch (timeframe) {
//         case "week":
//           // Get the start of the current week (Sunday)
//           const weekStart = new Date(currentDate);
//           weekStart.setDate(currentDate.getDate() - currentDate.getDay());
//           weekStart.setHours(0, 0, 0, 0);
//           return itemDate >= weekStart;

//         case "month":
//           // Get the start of the current month
//           return (
//             itemDate.getMonth() === currentDate.getMonth() &&
//             itemDate.getFullYear() === currentDate.getFullYear()
//           );

//         case "year":
//           // Get all data from the current year
//           return itemDate.getFullYear() === currentDate.getFullYear();

//         default:
//           return true;
//       }
//     });

//     setFilteredData(filteredResults);
//     setSelectedFilter(timeframe);
//   };

//   useLayoutEffect(() => {
//     // Initial filter
//     filterData(selectedFilter);
//   }, []);

//   return (
//     <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 bg-[#F3F3F3]">
//       {/* First Row - Modified for 70-30 split */}

//       <div className="grid grid-cols-12 gap-6">
//         {/* Video Section */}
//         <div className="col-span-12 lg:col-span-8 rounded-lg">
//           <div className="aspect-w-16 aspect-h-9 mb-5">
//             {imageStreaming ? (
//               <img
//                 title="Video Stream"
//                 className="w-full h-[500px] rounded-lg"
//                 src={imageStreaming}
//               />
//             ) : (
//               <div className="text-center p-4 rounded-lg flex items-center justify-center h-[500px]">
//                 <p className="text-yellow-700 font-medium">
//                   No image stream available. Please go to configurations and set
//                   it up.
//                 </p>
//               </div>
//             )}

//             {/* <img title="Video Stream" className="w-full h-[500px] rounded-lg" src={imageStreaming}/> */}
//           </div>
//         </div>

//         {/* Card with Numeric Data */}
//         <div className="col-span-12 lg:col-span-4 space-y-6">
//           {/* Time Period Filter */}
//           <Dropdown>
//             <DropdownTrigger>
//               <Button variant="flat" className="capitalize">
//                 Filter : {selectedFilter}
//                 <img src="/fi-rr-caret-down.png" />
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               aria-label="Time period selection"
//               onAction={(key) => filterData(key)}
//             >
//               <DropdownItem key="week">This Week</DropdownItem>
//               <DropdownItem key="month">This Month</DropdownItem>
//               <DropdownItem key="year">This Year</DropdownItem>
//             </DropdownMenu>
//           </Dropdown>

//           <div className="rounded-lg flex flex-wrap lg:flex-nowrap justify-between items-stretch bg-white">
//             {/* Column 1: Numeric Data */}
//             <div className="flex-1 bg-[#FF6A55] rounded-l-lg text-white p-6 flex flex-col items-center justify-center">
//               <img src="/bug.png" alt="Bug Icon" className="w-16 h-16 mb-4" />
//               <h2 className="text-2xl font-bold mb-2">Total Defects</h2>
//               <p className="text-4xl font-extrabold">
//                 {
//                   filteredData.filter((item) => item.category === "Defect")
//                     .length
//                 }
//               </p>
//             </div>

//             {/* Column 2: Additional Data */}
//             <div className="flex-1 flex flex-col justify-between py-4 px-6 rounded-lg">
//               <div className="flex items-center gap-4 mb-4">
//                 <img
//                   src="/Group 44.png"
//                   alt="Holes Icon"
//                   className="w-12 h-12"
//                 />
//                 <div>
//                   <p className="text-3xl font-extrabold text-[#FF6A55]">
//                     {
//                       filteredData.filter((item) => item.Type === "Holes")
//                         .length
//                     }
//                   </p>
//                   <h2 className="text-lg font-bold text-gray-700">
//                     Total Holes
//                   </h2>
//                 </div>
//               </div>

//               <hr className="border-gray-300" />

//               <div className="flex items-center gap-4 mt-4">
//                 <img
//                   src="/Group 48.png"
//                   alt="Folding Icon"
//                   className="w-12 h-12"
//                 />
//                 <div>
//                   <p className="text-3xl font-extrabold text-[#FF6A55]">
//                     {
//                       filteredData.filter((item) => item.Type === "Folding")
//                         .length
//                     }
//                   </p>
//                   <h2 className="text-lg font-bold text-gray-700">
//                     Total Folding
//                   </h2>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-2">
//             {/* Warning Card */}
//             <div className="bg-[#E6B454] rounded-lg p-6 text-white flex items-center gap-4 h-44 shadow-[#E6B45499] shadow-lg">
//               <img
//                 src="/Group 44 (1).png"
//                 alt="Warning Icon"
//                 className="w-12 h-12"
//               />
//               <div>
//                 <p className="text-lg font-medium">Warning</p>
//                 <h2 className="text-3xl font-extrabold">
//                   {
//                     filteredData.filter((item) => item.category === "Warning")
//                       .length
//                   }
//                 </h2>
//               </div>
//             </div>

//             {/* Clean Days Card */}
//             <div className="bg-[#33B8B0] rounded-lg p-6 text-white flex items-center gap-4 shadow-[#33B8B099] shadow-lg">
//               <img
//                 src="/fi-rr-shield-check.png"
//                 alt="Clean Days Icon"
//                 className="w-12 h-12"
//               />
//               <div>
//                 <p className="text-lg font-medium">Clean Days</p>
//                 <h2 className="text-3xl font-extrabold">
//                   {/* Calculate clean days based on filtered data */}
//                   {
//                     new Set(
//                       filteredData
//                         .filter(
//                           (item) =>
//                             item.category !== "Defect" &&
//                             item.category !== "Warning"
//                         )
//                         .map((item) => item.timestamp.split(" ")[0])
//                     ).size
//                   }
//                 </h2>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Charts Section */}
//       <div className="grid grid-cols-12 gap-6 mb-6  shadow-lg">
//         <div className="col-span-12 lg:col-span-8 bg-white shadow rounded-lg p-6">
//           <h2 className="text-xl font-bold mb-4">Line Chart</h2>
//           <LineChart data={data} />
//         </div>

//         <div className="col-span-12 lg:col-span-4 bg-white shadow-lg rounded-lg p-8">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//             Pie Chart
//           </h2>
//           <div className="flex justify-center items-center">
//             <PieChart data={filteredData} />
//           </div>
//         </div>
//       </div>
//       {/* Heatmap Section */}
//       <div className="mt-6 ">
//         <div className="bg-white shadow rounded-lg p-6 ">
//           <Heatmap rawData={filteredData} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;









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
  Image,
} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { get } from "../services/http";

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState("year");
  const [factoryData, setFactoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [imageStreaming, setImageStreaming] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchConfig = async () => {
      const res = await get("/api/config");
      setImageStreaming(res.stream_url);
    };
    fetchConfig();

    const eventSource = new EventSource(import.meta.env.VITE_BACKEND_URL + "/api/stream");
    
    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setFactoryData(prevData => {
        const updatedData = [newData];
        filterData(selectedFilter, updatedData);
        return updatedData;
      });
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const filterData = (timeframe, data = factoryData) => {
    const currentDate = new Date();
    const filteredResults = data[0].filter((item) => {
      const itemDate = new Date(item.timestamp);

      switch (timeframe) {
        case "week":
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - currentDate.getDay());
          weekStart.setHours(0, 0, 0, 0);
          return itemDate >= weekStart;

        case "month":
          return (
            itemDate.getMonth() === currentDate.getMonth() &&
            itemDate.getFullYear() === currentDate.getFullYear()
          );

        case "year":
          return itemDate.getFullYear() === currentDate.getFullYear();

        default:
          return true;
      }
    });

    setFilteredData(filteredResults);
    setSelectedFilter(timeframe);
  };

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
              onAction={(key) => filterData(key)}
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
              <p className="text-4xl font-extrabold">
                {filteredData.filter((item) => item.category === "Defect").length}
              </p>
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
                    {filteredData.filter((item) => item.type === "Holes").length}
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
                    {filteredData.filter((item) => item.type === "Folding").length}
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
                <h2 className="text-3xl font-extrabold">
                  {filteredData.filter((item) => item.category === "Warning").length}
                </h2>
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
                  {new Set(
                    filteredData
                      .filter(
                        (item) =>
                          item.category !== "Defect" &&
                          item.category !== "Warning"
                      )
                      .map((item) => item.timestamp.split(" ")[0])
                  ).size}
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
            <PieChart data={filteredData} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white shadow rounded-lg p-6">
          <Heatmap rawData={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;