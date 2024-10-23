import { assets } from "../assets/assets.js";
const Navbar = () => {
  return (
    <nav className="p-4 flex justify-between items-center">
      {/* Left Side: Logo and Admin Panel Heading */}
      <div className="flex items-center space-x-8">
        <img src={assets.logo} alt="Food Order Logo" className="w-10 h-10" />
        <h1 className="text-xl font-medium">Admin Panel</h1>
      </div>

      {/* Right Side: Profile Image */}
      <div>
        <img
          src={assets.profile_image}
          alt="Profile Image"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </nav>

  );
};

export default Navbar;
