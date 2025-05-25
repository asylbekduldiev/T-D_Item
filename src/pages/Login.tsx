import { useState } from "react";
import axios from "../services/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // сброс ошибки
    try {
      const res = await axios.post("/auth/login", data);
      login(res.data.token);
      navigate("/");
    } catch {
      setError("Неверный логин или пароль");
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-96 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <input
        value={data.username}
        onChange={e => setData({ ...data, username: e.target.value })}
        placeholder="Username"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <input
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
        placeholder="Password"
        type="password"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
      >
        Login
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}