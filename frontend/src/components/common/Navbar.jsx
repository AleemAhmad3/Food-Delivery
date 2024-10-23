import { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Button from "./Button";
import { BsHandbag } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";
import profileImage from "../../assets/profile_icon.png";
import Login from "../auth/Login";
import SignUp from "../auth/Signup";
import cartImage from "../../assets/basket_icon.png";
import logoutImage from "../../assets/logout_icon.png";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import useCartStore from "../../store/CartStore"; 

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown
  const navigate = useNavigate();
  const fetchCart = useCartStore((state) => state.fetchCart); // Get fetchCart method from Zustand store

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        toast.error("Your session has expired. Please log in again.");
        if (localStorage.getItem("token")) localStorage.removeItem("token");
        if (sessionStorage.getItem("token")) sessionStorage.removeItem("token");
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    setIsAuthenticated(false);
    navigate("/");
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleCartClick = () => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      fetchCart(token); // Call the fetchCart method when clicking the cart
    }
    navigate("/cart"); // Navigate to the cart page
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav className="p-3">
        <div className="flex justify-between items-center">
          <img
            src={logo}
            alt="Logo"
            className="w-20 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="hidden lg:flex items-center flex-grow">
            <ul className="flex gap-6 mx-auto uppercase">
              {["home", "menu", "contact"].map((item) => (
                <li key={item}>
                  <NavLink
                    to={`/${item === "home" ? "" : item}`}
                    className={({ isActive }) =>
                      isActive ? "text-brightColor" : "text-gray-700"
                    }
                  >
                    {item.charAt(0).toUpperCase() +
                      item.slice(1).replace("-", " ")}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden lg:flex items-center gap-6">
            {isAuthenticated && (
              <button onClick={handleCartClick}>
                <img src={cartImage} alt="Cart Image" />
              </button>
            )}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center text-gray-700 hover:text-brightColor"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <img
                    src={profileImage}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border p-1"
                  />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 w-48 mt-2 bg-white border rounded-md shadow-lg z-50">
                    <ul className="py-2">
                      <li
                        onClick={() => navigate("/myorders")}
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        <BsHandbag className="w-5 h-5 mr-2" />
                        <span>Orders</span>
                      </li>
                      <hr />
                      <li
                        className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <img
                          src={logoutImage}
                          alt="Logout"
                          className="w-5 h-5 mr-2"
                        />
                        <span>Logout</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Button title="Login" onClick={() => toggleModal("login")} />
            )}
          </div>

          <div className="lg:hidden flex items-center gap-4">
            {isAuthenticated && (
              <button onClick={handleCartClick}>
                <img src={cartImage} alt="Cart Image" />
              </button>
            )}
            <button onClick={toggleMenu} className="text-3xl">
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden fixed top-0 left-0 w-full h-full shadow-lg transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          style={{ zIndex: 50 }}
        >
          <div className="flex flex-col items-center pt-10 space-y-6 z-10 uppercase">
            {["home", "menu", "contact"].map((item) => (
              <NavLink
                key={item}
                to={`/${item === "home" ? "" : item}`}
                className={({ isActive }) =>
                  isActive ? "text-brightColor" : "text-gray-700"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="flex flex-col gap-6 items-center">
                <NavLink
                  to="/myorders"
                  className="flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BsHandbag className="mr-2" />
                  <span>Orders</span>
                </NavLink>
                <button className="flex items-center" onClick={handleLogout}>
                  <img src={logoutImage} alt="Logout" className="mr-2" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  toggleModal("login");
                  setIsMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
          </div>
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-3xl text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        <div
          className={`lg:hidden transition-all duration-300 ${
            isMenuOpen ? "mt-[calc(100vh)]" : ""
          }`}
        ></div>
      </nav>

      {modalType === "login" && (
        <Login
          onSignUpClick={() => toggleModal("signup")}
          onClose={closeModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
      {modalType === "signup" && <SignUp onClose={closeModal} />}
    </>
  );
};

export default Navbar;
