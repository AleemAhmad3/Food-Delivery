/* eslint-disable no-unused-vars */
import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode to decode the token
import useCartStore from "../store/CartStore"; // Update the import path as necessary

const PlaceOrder = () => {
  const { cartItems } = useCartStore(); // Get cart items from Zustand store

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.productId.price); // Ensure price is a number
    const quantity = item.quantity;

    if (isNaN(price) || isNaN(quantity)) {
      return total; // Skip this item if price or quantity is invalid
    }

    return total + price * quantity; // Calculate the total
  }, 0);

  const deliveryFee = 2; // Example delivery fee
  const total = !isNaN(cartTotal) ? cartTotal + deliveryFee : 0; // Calculate total amount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the token from local or session storage
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // Decode the token to get the user ID
    let userId;
    if (token) {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id; // Adjust according to the token structure
    } else {
      alert("You are not logged in. Please log in to place an order.");
      return; // Prevent form submission if there’s no token
    }

    // Check if total is a valid number
    if (isNaN(total)) {
      alert(
        "There was an error calculating the total. Please check your cart."
      );
      return; // Prevent form submission if total is invalid
    }

    // Construct order data
    const orderData = {
      userid: userId, // Use the decoded user ID
      items: cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        price: parseFloat(item.productId.price), // Ensure each item has a price
      })),
      amount: total, // Total should be valid now
      address: {
        street: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders/place",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.data.success) {
        window.location.href = response.data.session_url; // Redirect to Stripe checkout
      } else {
        alert("Failed to create order. Please try again.");
      }
    } catch (error) {
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-4 lg:px-0 py-8">
      <div className="w-full max-w-4xl p-8 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-8 h-3/5">
        {/* Delivery Information Form */}
        <div className="col-span-2 bg-white p-6 rounded-lg shadow-lg border">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Delivery Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street"
                className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="outline-none mt-1 block w-full border p-3 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm transition duration-200 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded-md w-full text-white flex items-center justify-center">
                Place Order
              </button>
            </div>
          </form>
        </div>

        {/* Cart Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg border flex flex-col h-56">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {/* Content container that will grow to take up available space */}
          <div className="space-y-4 flex-grow">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
