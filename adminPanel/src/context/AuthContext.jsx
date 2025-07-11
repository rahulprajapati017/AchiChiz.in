// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const local = localStorage.getItem("admin");
    return local ? JSON.parse(local) : null;
  });

  const login = (email, password) => {
    if (email === "admin@demo.com" && password === "admin123") {
      const fakeAdmin = { email, role: "admin" };
      localStorage.setItem("admin", JSON.stringify(fakeAdmin));
      setAdmin(fakeAdmin);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
