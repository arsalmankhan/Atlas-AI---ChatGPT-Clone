import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../store/authSlice";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    axios
      .post(
        "http://localhost:3000/api/auth/register",
        {
          email: form.email,
          fullName: {
            firstName: form.firstname,
            lastName: form.lastname,
          },
          password: form.password,
        },
        { withCredentials: true }
      )
      .then((res) => {

        // ✅ User ko Redux store me daalo
        dispatch(setUser(res.data.user));

        // ✅ Redirect
        navigate("/");
      })
      .catch((err) => console.error(err))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center app-root p-4">
      <div className="card w-full max-w-md p-6 sm:p-8 shadow">
        <h1 className="text-2xl font-semibold mb-1">Create account</h1>
        <p className="text-sm text-muted mb-6">Start your free account</p>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label htmlFor="email" className="block text-sm mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="input w-full"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="firstname" className="block text-sm mb-1">
              First name
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              required
              placeholder="John"
              className="input w-full"
              value={form.firstname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="lastname" className="block text-sm mb-1">
              Last name
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              required
              placeholder="Doe"
              className="input w-full"
              value={form.lastname}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Create a password"
              className="input w-full"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-primary w-full py-2 rounded">
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
