/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import { jwtDecode } from "jwt-decode";

const Login = ({ onSignUpClick, onClose, onLoginSuccess }) => { // Add onLoginSuccess prop
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [stayLoggedIn, setStayLoggedIn] = useState(false); // State to track "Stay Logged In"

  useEffect(() => {
    const token = stayLoggedIn ? localStorage.getItem("token") : sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        toast.error("Your session has expired. Please log in again.");
        if (stayLoggedIn) localStorage.removeItem("token");
        else sessionStorage.removeItem("token");
      }
    }
  }, [stayLoggedIn]);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleStayLoggedInChange = (e) => {
    setStayLoggedIn(e.target.checked); // Toggle "Stay Logged In" checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        loginData
      );

      if (response.data.success) {
        // Use sessionStorage or localStorage based on the "Stay Logged In" checkbox
        if (stayLoggedIn) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }

        // Notify Navbar about successful login
        onLoginSuccess(); // Call the function to update authentication state

        toast.success("Login successful!");
        setLoginData({ email: "", password: "" });
        onClose(); // Close the modal on successful login
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500">
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={stayLoggedIn}
              onChange={handleStayLoggedInChange}
              className="mr-2"
            />
            <label>Stay Logged In</label>
          </div>
          <button
            type="submit"
            className="w-full h-12  bg-brightColor hover:bg-orange-600 text-white font-semibold rounded transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-700">Don&apos;t have an account? </span>
          <button onClick={onSignUpClick}  className="text-brightColor hover:text-orange-500 font-semibold cursor-pointer">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
