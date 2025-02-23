import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(JSON.parse(user));
    
    setUser(JSON.parse(user));
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/api/auth/login",
        credentials
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      const user = res.data.user;
      console.log("user", user);
      
      setUser(user);
      navigate(user.role === "HR" ? "/admin" : "/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
