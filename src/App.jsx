

// import "./App.css";
// import { Tabs, Tab } from "@nextui-org/tabs";
// import Configration from "./pages/Configration";
// import Dashboard from "./pages/Dashboard";
// import Records from "./pages/records";


// const App = () => {

//   return (
//     <Tabs
//       aria-label="Options"
//       variant="underlined"
//       classNames={{
//         base: "w-full",
//         tabList: "w-fit mx-auto gap-3 mt-1", // This centers just the tab buttons
//         tab: "px-4",
//         tabContent: [
//           "group-data-[selected=true]:text-[#33B8B0]",
//           "group-data-[selected=true]:font-semibold",
//           "group-data-[hover=true]:text-[#33B8B0]/70",
//           "group-data-[disabled=true]:text-gray-400",
//         ].join(" "),
//         cursor: [
//           "bg-[#33B8B0]",
//           "transition-all",
//           "duration-200",
//         ]
//       }}
//     >
//       <Tab key="Dashboard" title="Dashboard">
//         <Dashboard className="flex justify-center" />
//       </Tab>
//       <Tab key="Records" title="Records">
//         <Records />
//       </Tab>
//       <Tab key="configurations" title="Configuration">
//         <Configration />
//       </Tab>
//     </Tabs>
//   );
// };

// export default App;





import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Records from "./pages/Records";
import Configration from "./pages/Configration";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized ";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Admin Access */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin", "User"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/config"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Configration />
            </ProtectedRoute>
          }
        />

        {/* User and Admin Access */}
        <Route
          path="/records"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Records />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
