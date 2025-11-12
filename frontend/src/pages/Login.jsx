import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      dispatch(setUser(res.data.user));
      navigate("/");
    } catch (err) {
      alert("Invalid credentials");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000] text-white px-3">
      <div className="w-full max-w-md bg-[#111] rounded-2xl border border-[#222] p-8 shadow-xl">

        <h2 className="text-3xl font-semibold text-center mb-6">
          Sign in to your AI assistant
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="bg-[#0c0c0c] border border-[#1f1f1f] px-4 py-3 rounded-lg focus:border-gray-300 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="bg-[#0c0c0c] border border-[#1f1f1f] px-4 py-3 rounded-lg focus:border-gray-300 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="bg-white text-black hover:bg-neutral-200 transition-colors py-3 rounded-lg text-sm font-semibold"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-400 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
