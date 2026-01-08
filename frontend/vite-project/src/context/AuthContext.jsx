import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading,setauthLoading]=useState(true);

  // 🔥 Restore user after refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    console.log("🔁 Auth restore effect running");
  console.log("📦 Token from localStorage:", storedUser);
    if (storedUser) {
      setUser(storedUser);
    }
    setauthLoading(false);
    console.log("🧠 AuthContext render → user:", user, "loading:", authLoading);
  }, []);

  const login = async (email, password) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    { email, password }
  );

  console.log("LOGIN API RESPONSE:", res.data);

  // 🔥 REQUIRED
  localStorage.setItem("token", res.data.token);
  setUser(res.data.token);
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user,authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};


