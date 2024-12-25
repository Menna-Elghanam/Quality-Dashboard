// import "./App.css";

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Dashboard from "./pages/Dashboard";
// import Records from "./pages/Records";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Dashboard />} />
//       <Route path="/records" element={<Records />} />

//     </Routes>
//   );
// };

// export default App;

import "./App.css";
import { Tabs, Tab } from "@nextui-org/tabs";
import Records from "./pages/Records";
import Dashboard from "./pages/Dashboard";
// import { useLayoutEffect } from "react";
import { use } from "framer-motion/client";


const App = () => {

  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      classNames={{
        base: "w-full",
        tabList: "w-fit mx-auto gap-3", // This centers just the tab buttons
        tab: "px-4",
        tabContent: [
          "group-data-[selected=true]:text-[#33B8B0]",
          "group-data-[selected=true]:font-semibold",
          "group-data-[hover=true]:text-[#33B8B0]/70",
          "group-data-[disabled=true]:text-gray-400",
        ].join(" "),
        cursor: [
          "bg-[#33B8B0]",
          "transition-all",
          "duration-200",
        ]
      }}
    >
      <Tab key="Dashboard" title="Dashboard">
        <Dashboard className="flex justify-center" />
      </Tab>
      <Tab key="Records" title="Records">
        <Records />
      </Tab>
    </Tabs>
  );
};

export default App;
