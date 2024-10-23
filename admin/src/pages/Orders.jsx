import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import parcelImage from "../assets/parcel_icon.png"; // Add your parcel image path here

const Orders = () => {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders/list");
      if (response.data.success) {
        const updatedOrders = response.data.data.map((order) => ({
          ...order,
          status: order.status || "Food Processing", // Ensuring status is set
        }));
        setOrders(updatedOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Network error");
      console.error(error);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post("http://localhost:5000/api/orders/status", {
        orderid: orderId,
        status: newStatus,
      });

      if (response.data.success) {
        // Update the local state immediately
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
        toast.success("Status updated successfully!");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating status");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:flex-row p-4 border-b border-gray-200"
          >
            {/* Parcel Image */}
            <div className="flex justify-center md:justify-start md:w-1/6">
              <img src={parcelImage} alt="Parcel" className="w-16 h-16" />
            </div>

            {/* Order and Address Details */}
            <div className="md:w-2/6 md:ml-4">
              <p className="font-semibold">Address:</p>
              <p>
                {order.address.street}, {order.address.city},{" "}
                {order.address.postalCode}
              </p>
              <p className="text-gray-500">Order Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Food Items */}
            <div className="md:w-2/6 md:ml-4">
              <p className="font-semibold">Food Items:</p>
              <ul className="list-disc pl-5">
                {order.items.map((item, index) => (
                  <li key={index}>
                    {item.productId.name} - {item.quantity} pcs
                  </li>
                ))}
              </ul>
            </div>

            {/* Total Items and Price */}
            <div className="flex flex-col md:flex-row md:w-1/3 md:ml-4 mr-10 md:justify-between">
              {/* Total Items */}
              <div className="text-center md:text-left">
                <p className="font-semibold">Total Items</p>
                <p>{order.items.length}</p>
              </div>

              {/* Total Price */}
              <div className="text-center md:text-left md:mr-4">
                <p className="font-semibold">Total Price</p>
                <p>${order.amount}</p>
              </div>
            </div>

            {/* Status Dropdown */}
            <div className="flex flex-col md:w-1/6 md:ml-4 mt-4 md:mt-0">
              <label className="font-semibold mb-1">Status:</label>
              <select
                value={order.status}
                onChange={(event) => statusHandler(event, order._id)}
                className="border border-gray-300 p-2 outline-none bg-lightColor rounded"
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
