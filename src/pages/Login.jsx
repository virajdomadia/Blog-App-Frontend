import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      console.log("Sending login request...");

      const response = await axios.post(
        "https://blog-app-backend-nnuo.onrender.com/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      console.log("Login Response:", response);

      // Save token or user data to localStorage or context
      localStorage.setItem("token", response.data.token);

      setError("");

      console.log("Login successful, redirecting to dashboard...");

      // Redirect to the dashboard or homepage
      navigate("/");
    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        console.error("Error Response Data:", err.response.data);
        setError(err.response.data?.message || "Invalid email or password.");
      } else if (err.request) {
        console.error("No Response Received:", err.request);
        setError("No response from the server. Please try again later.");
      } else {
        console.error("Request Error:", err.message);
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login to Your Account
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
