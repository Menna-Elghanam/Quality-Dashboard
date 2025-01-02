import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken && storedRole) {
      setToken(storedToken);
      setUser(storedRole);
    }
    setLoading(false);
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    //
    localStorage.setItem("role", role);
    setToken(token);
    setUser(role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// import React, { createContext, useContext, useState, useEffect } from "react";
// import {jwtDecode} from "jwt-decode";


// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const decodeToken = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       if (decoded.exp * 1000 < Date.now()) {
//         // Token expired
//         logout();
//         return null;
//       }
//       return decoded;
//     } catch (error) {
//       console.error("Error decoding token:", error);
//       return null;
//     }
//   };

//   useEffect(() => {
//     const storedToken = localStorage.getItem("token");
//     if (storedToken) {
//       const decoded = decodeToken(storedToken);
//       if (decoded) {
//         setToken(storedToken);
//         setUser({
//           role: decoded.role,
//         });
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = (newToken) => {
//     const decoded = decodeToken(newToken);
//     if (!decoded) {
//       throw new Error("Invalid token");
//     }
    
//     localStorage.setItem("token", newToken);
//     setToken(newToken);
//     setUser({
//       role: decoded.role,
//     });
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);