/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaStar, FaShoppingCart } from "react-icons/fa"; 
import useCartStore from "../../store/CartStore";
import { toast } from "react-toastify";

const DishesCard = ({ img, title, description, price, id }) => {
  const [localQuantity, setLocalQuantity] = useState(0); // Local state to track the quantity
  const [showControls, setShowControls] = useState(false); // To control visibility of + and - box
  const addToCart = useCartStore((state) => state.addToCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const cartItems = useCartStore((state) => state.cartItems);

  // Sync local quantity with cart items from Zustand store
  useEffect(() => {
    const existingItem = cartItems.find((item) => item.productId?._id === id);
    if (existingItem) {
      setLocalQuantity(existingItem.quantity); // Set the quantity if item is in the cart
      setShowControls(true); // Keep controls visible if the item is in the cart
    } else {
      setLocalQuantity(0); // Reset if not found in the cart
      setShowControls(false); // Hide controls if not in the cart
    }
  }, [cartItems, id]);

  // Add the item to the cart and set quantity to 1
  const handleAddToCart = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;
 
    try {
       const result = await addToCart(token, { _id: id });
       if (result && result.success) {
          setLocalQuantity(1); // Set the initial quantity to 1 when first added
          setShowControls(true); // Show the + and - controls after adding to cart
          toast.success("Item added to cart!"); // Show success toast
       } else {
          toast.error("Failed to add item to cart."); // Show error toast if adding fails
       }
    } catch (error) {
       console.error("Error adding to cart:", error);
       toast.error("An error occurred while adding to cart."); // Show error toast
    }
 };
 

  // Increase the quantity in both UI and store
  const handleIncrease = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    // Locally increase the quantity first for immediate feedback
    setLocalQuantity((prevQuantity) => prevQuantity + 1);

    try {
      const result = await updateQuantity(token, id, "increase");
      if (!result || !result.success) {
        setLocalQuantity((prevQuantity) => prevQuantity - 1); // Roll back in case of an error
      }
    } catch (error) {
      setLocalQuantity((prevQuantity) => prevQuantity - 1); // Roll back in case of an error
      console.error("Error increasing quantity:", error);
    }
  };

  // Decrease the quantity, or hide controls if quantity becomes 0
  const handleDecrease = async () => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) return;

    // Locally decrease the quantity first for immediate feedback
    if (localQuantity > 0) {
      setLocalQuantity((prevQuantity) => prevQuantity - 1);
    }

    try {
      if (localQuantity === 1) {
        const result = await updateQuantity(token, id, "decrease");
        if (result && result.success) {
          setLocalQuantity(0);
          setShowControls(false); // Hide controls if quantity is 0
        } else {
          setLocalQuantity(1); // Roll back to 1 in case of an error
        }
      } else if (localQuantity > 1) {
        const result = await updateQuantity(token, id, "decrease");
        if (!result || !result.success) {
          setLocalQuantity((prevQuantity) => prevQuantity + 1); // Roll back in case of an error
        }
      }
    } catch (error) {
      setLocalQuantity((prevQuantity) => prevQuantity + 1); // Roll back in case of an error
      console.error("Error decreasing quantity:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 relative overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-48 object-cover mb-4 rounded-lg"
        />

        {showControls ? ( // Show controls if item is in the cart
          <div className="absolute bottom-2 right-2 flex justify-center items-center bg-white border border-gray-300 rounded-full shadow-md h-10 w-28">
            <button
              className="flex justify-center items-center h-8 w-8 text-red-500 bg-red-100 rounded-full"
              onClick={handleDecrease}
            >
              <FaMinus />
            </button>
            <span className="px-3">{localQuantity}</span> {/* Display updated localQuantity */}
            <button
              className="flex justify-center items-center h-8 w-8 text-green-500 bg-green-100 rounded-full"
              onClick={handleIncrease}
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <div
            className="absolute bottom-2 right-2 bg-white text-gray-500 p-2 rounded-full border cursor-pointer transition-colors duration-300 hover:bg-opacity-80"
            onClick={handleAddToCart} // Trigger add to cart on first click
          >
            <FaShoppingCart /> {/* Use a shopping cart icon for initial add */}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
        <span className="text-gray-800">{title}</span>
        <div className="flex text-brightColor">
          {[...Array(4)].map((_, index) => (
            <FaStar key={index} className="text-sm" />
          ))}
          <FaStar className="text-sm text-gray-300" />
        </div>
      </h3>
      <p className="text-gray-600 mb-2">{description}</p>
      <p className="mt-2 font-bold text-brightColor text-lg">${price}</p>
    </div>
  );
};

export default DishesCard;
