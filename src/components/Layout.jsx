// import { Tabs, Tab } from "@nextui-org/react";
// import { useNavigate, Outlet, useLocation } from "react-router-dom";

// function Layout() {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Map routes to tab keys
//   const tabKeyMap = {
//     "/dashboard": "dashboard",
//     "/records": "records",
//     "/config": "config",
//   };

//   const activeKey = tabKeyMap[location.pathname] || "dashboard";

//   return (
//     <div className="flex flex-col min-h-screen">
//       <header >
//         <Tabs
//           aria-label="Navigation Tabs"
//           selectedKey={activeKey}
//           onSelectionChange={(key) => {
//             const path = Object.keys(tabKeyMap).find((route) => tabKeyMap[route] === key);
//             if (path) navigate(path);
//           }}
//           className="p-4 flex justify-center"
//           variant="underlined"
//         >
//           <Tab key="dashboard" title="Dashboard" />
//           <Tab key="records" title="Records" />
//           <Tab key="config" title="Config" />
//         </Tabs>
//       </header>
//       <main >
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// export default Layout;

import { Tabs, Tab } from "@nextui-org/react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth(); // Access user role from AuthContext

  // Map routes to tab keys
  const tabKeyMap = {
    "/dashboard": "dashboard",
    "/records": "records",
    "/config": "config",
  };

  const activeKey = tabKeyMap[location.pathname] || "dashboard";

  // Define tabs based on role
  const tabs = [
    { key: "dashboard", title: "Dashboard", path: "/dashboard", roles: ["Admin", "User"] },
    { key: "records", title: "Records", path: "/records", roles: ["Admin"] },
    { key: "config", title: "Config", path: "/config", roles: ["Admin"] },
  ];

  // Filter tabs based on user's role
  const filteredTabs = tabs.filter((tab) => tab.roles.includes(user));

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Tabs
          aria-label="Navigation Tabs"
          selectedKey={activeKey}
          onSelectionChange={(key) => {
            const path = tabs.find((tab) => tab.key === key)?.path;
            if (path) navigate(path);
          }}
          className="p-4 flex justify-center"
          variant="underlined"
        >
          {filteredTabs.map((tab) => (
            <Tab key={tab.key} title={tab.title} />
          ))}
        </Tabs>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
