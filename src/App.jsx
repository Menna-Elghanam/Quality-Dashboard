import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Records from "./pages/Records.jsx";
import Configration from "./pages/Configration";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized ";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route element={<Layout />}>
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
          <Route
            path="/records"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Records />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
