/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import parcelImage from "../assets/parcel_icon.png";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [token, setToken] = useState("");

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const fetchOrders = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/userorders",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data && response.data.data) {
        setData(response.data.data);
      }
    } catch (error) {
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  useEffect(() => {
    const token = getToken();
    setToken(token);

    if (token) {
      fetchOrders(token);
    }
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((order) => (
            <div
              key={order._id}
              className="flex flex-col md:flex-row items-center bg-white border p-4 md:p-6 "
            >
              {/* Parcel Image */}
              <div className="w-16 h-16 md:w-24 md:h-24">
                <img
                  src={parcelImage}
                  alt="Parcel"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Order Details */}
              <div className="flex-1 md:ml-6 flex flex-col md:flex-row justify-between items-center">
                {/* Date and Address */}
                <div className="md:w-2/3 ">
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Address: {order.address.street}, {order.address.city},{" "}
                    {order.address.postalCode}
                  </p>
                </div>

                {/* Item Names */}
                <div className="flex flex-col md:w-1/3 md:ml-4">
                 
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 border mb-2"
                    >
                      <span>{item.productId.name}</span>
                      <span className="text-gray-500">{item.quantity} pcs</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price, Total Items, and Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-6 flex-1">
                {/* Total Price */}
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-semibold">Total Price</h3>
                  <p className="text-lg font-semibold">${order.amount}</p>
                </div>

                {/* Total Items */}
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-semibold">Items</h3>
                  <p className="text-lg font-semibold">{order.items.length}</p>
                </div>

                {/* Status with Dot */}
                <div className="flex flex-col items-center">
                  <h3 className="text-sm font-semibold">Status</h3>
                  <div className="flex items-center">
                    {order.status === "Food Processing" && (
                      <>
                        <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                        <p className="text-red-500">Food Processing</p>
                      </>
                    )}
                    {order.status === "Out for Delivery" && (
                      <>
                        <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
                        <p className="text-yellow-500">Out for Delivery</p>
                      </>
                    )}
                    {order.status === "Delivered" && (
                      <>
                        <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                        <p className="text-green-500">Delivered</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
