import { assets } from "../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Content */}
      <div className="w-full md:w-64 p-4 md:p-14 pr-0 md:pr-0 bg-white shadow-md"> {/* Adjust width for mobile */}
        {/* Box 1 */}
        <NavLink
          to="/add-items"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-2 border border-brightColor bg-lightColor mb-6 cursor-pointer"
              : "flex items-center space-x-4 p-2 border mb-6 cursor-pointer"
          }
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
          <span className="text-lg">Add Items</span>
        </NavLink>

        {/* Box 2 */}
        <NavLink
          to="/list-items"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-2 border border-brightColor bg-lightColor mb-6 cursor-pointer"
              : "flex items-center space-x-4 p-2 border mb-6 cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="Order Icon" className="w-6 h-6" />
          <span className="text-lg">List Items</span>
        </NavLink>

        {/* Box 3 */}
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "flex items-center space-x-4 p-2 border border-brightColor bg-lightColor mb-6 cursor-pointer"
              : "flex items-center space-x-4 p-2 border mb-6 cursor-pointer"
          }
        >
          <img src={assets.order_icon} alt="Order Icon" className="w-6 h-6" />
          <span className="text-lg">Orders</span>
        </NavLink>
      </div>

      {/* Vertical Line */}
      <div className="border-l border-gray-200 h-full hidden md:block"></div>
    </div>
  );
};

export default Sidebar;
