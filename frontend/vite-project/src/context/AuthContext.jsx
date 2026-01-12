import { createContext, useContext, useEffect, useState } from "react";
 import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔥 Restore auth on refresh
 
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAuthLoading(false);
    return;
  }

  axios
    .get("http://localhost:3003/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setUser(res.data.user); // backend verified
    })
    .catch(() => {
      // 🔥 token expired / invalid
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
    })
    .finally(() => {
      setAuthLoading(false);
    });
}, []);


  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
