import { useEffect, useState } from "react";
import axios from "../services/api";
import { useAuth } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";

type Todo = { id: number; title: string; completed: boolean };

export default function TodoList() {
  const { token, logout } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");

  if (!token) return <Navigate to="/login" replace />;

  useEffect(() => {
    axios.get("/todos").then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post("/todos", { title, completed: false });
    setTodos(prev => [...prev, res.data]);
    setTitle("");
  };

  const toggleTodo = async (todo: Todo) => {
    const res = await axios.put(`/todos/${todo.id}`, {
      ...todo,
      completed: !todo.completed,
    });
    setTodos(prev =>
      prev.map(t => (t.id === todo.id ? res.data : t))
    );
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`/todos/${id}`);
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Todo List</h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        <form className="flex gap-2 mb-6" onSubmit={e => { e.preventDefault(); addTodo(); }}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="New Todo"
            className="flex-grow px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul className="space-y-3">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded shadow-sm"
            >
              <span
                onClick={() => toggleTodo(todo)}
                className={`cursor-pointer select-none ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}
              >
                {todo.title}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-600 hover:text-red-800 font-bold text-xl leading-none"
                aria-label="Delete task"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
    </div>
  );
}