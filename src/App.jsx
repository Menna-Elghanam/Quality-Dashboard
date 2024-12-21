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

const App = () => {
  return (
    <Tabs aria-label="Options" variant="underlined">
      <Tab key="Dashboard" title="Dashboard">
        <Dashboard />
      </Tab>
      <Tab key="Records" title="Records">
        <Records />
      </Tab>
    </Tabs>
  );
};

export default App;
