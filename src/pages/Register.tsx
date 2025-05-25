import { useState } from "react";
import axios from "../services/api";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", data);
      login(res.data.token);
      navigate("/");
      setData({ username: "", email: "", password: "" });
      setError("");
    } catch (err) {
      setError("Ошибка регистрации");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-96 mx-auto mt-10 p-6 bg-white rounded-lg shadow-md"
    >
      <input
        value={data.username}
        onChange={e => setData({ ...data, username: e.target.value })}
        placeholder="Username"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        required
      />
      <input
        value={data.email}
        onChange={e => setData({ ...data, email: e.target.value })}
        placeholder="Email"
        type="email"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        required
      />
      <input
        value={data.password}
        onChange={e => setData({ ...data, password: e.target.value })}
        placeholder="Password"
        type="password"
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        required
      />
      <button
        type="submit"
        className="mt-4 bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
      >
        Register
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
      <Link to="/login" className="text-sm text-blue-600 hover:underline text-center mt-2 block">
        Уже есть аккаунт? Войти
      </Link>
    </form>
  );
}