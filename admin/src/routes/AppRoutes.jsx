import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Add from "../pages/Add";
import List from "../pages/List";
import Orders from "../pages/Orders";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-items" element={<Add />} />
      <Route path="/list-items" element={<List />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
};

export default AppRoutes;
