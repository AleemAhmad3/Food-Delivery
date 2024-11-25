/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { AiOutlineClose } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios"; 
import { toast } from "react-toastify"; 
import { jwtDecode } from "jwt-decode";
const SignUp = ({ onLoginClick, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [stayLoggedIn, setStayLoggedIn] = useState(false); // State for "Stay Logged In"

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStayLoggedInChange = (e) => {
    setStayLoggedIn(e.target.checked); // Toggle "Stay Logged In" checkbox
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://food-delivery-nnwo.onrender.com/api/user/register", formData);
      
      if (response.data.success) {
        // Use sessionStorage or localStorage based on "Stay Logged In"
        if (stayLoggedIn) {
          localStorage.setItem("token", response.data.token);
        } else {
          sessionStorage.setItem("token", response.data.token);
        }
        const decodedToken = jwtDecode(response.data.token);

        toast.success("Account created successfully!");
        setFormData({ name: "", email: "", password: "" });
        onClose();
        window.location.reload(); // Reload to trigger login state update
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-96 max-w-md bg-white rounded-lg shadow-xl p-8 relative flex flex-col h-[27rem]">
        <button
          className="absolute top-9 right-4 text-gray-600 text-2xl hover:text-gray-800 transition-colors duration-200"
          onClick={onClose}
        >
          <AiOutlineClose />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign Up</h2>
        <form className="flex-grow space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="mt-1 block w-full h-12 px-3 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 transition duration-150 ease-in-out"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="stayLoggedIn"
              checked={stayLoggedIn}
              onChange={handleStayLoggedInChange}
              className="mr-2"
            />
            <label htmlFor="stayLoggedIn" className="text-sm text-gray-600">
              Stay Logged In
            </label>
          </div>
          <button
            title="Sign Up"
            type="submit"
            className="w-full h-12 bg-brightColor hover:bg-orange-600 text-white font-semibold rounded transition duration-200"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-brightColor hover:text-orange-500 font-semibold cursor-pointer"
              onClick={onLoginClick}
            >
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
