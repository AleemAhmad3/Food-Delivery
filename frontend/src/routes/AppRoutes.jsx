/* eslint-disable react/prop-types */
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Menu from "../pages/Menu"; // Ensure Menu component can receive foodItems
import ContactUs from "../pages/ContactUs";
import Cart from "../pages/Cart";
import PlaceOrder from "../pages/PlaceOrder";
import Verify from "../pages/Verify";
import MyOrders from "../pages/MyOrders";
import NotFound from "../pages/NotFound";

const AppRoutes = ({ foodItems }) => { // Accept foodItems as a prop
  return (
    <Routes>
      <Route path="/" element={<Home  foodItems={foodItems}/>} />
      <Route path="/menu" element={<Menu foodItems={foodItems} />} /> {/* Pass foodItems to Menu */}
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/placeorder" element={<PlaceOrder />} />
      <Route path="/verify" element={<Verify />} />
      <Route path="/myorders" element={<MyOrders />} />
      <Route path="*" element={<NotFound />} /> {/* Handle unknown routes */}
    </Routes>
  );
};

export default AppRoutes;
