import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<any>(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (t: string) => {
    localStorage.setItem("token", t);
    setToken(t);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};