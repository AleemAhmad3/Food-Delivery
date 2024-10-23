import { useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useCartStore from "../store/CartStore";
import Loading from '../components/common/Loading'; // Import the Loading component

const Cart = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const fetchCart = useCartStore((state) => state.fetchCart);
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  useEffect(() => {
    if (token) {
      fetchCart(token);
    }
  }, [fetchCart, token]);

  const total = cartItems.reduce(
    (acc, item) => acc + ((item.productId?.price || 0) * item.quantity || 0),
    0
  );

  const handleIncrease = async (item) => {
    if (!token) return;
    try {
      await updateQuantity(token, item.productId._id, "increase");
      await fetchCart(token);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const handleDecrease = async (item) => {
    if (!token) return;
    try {
      await updateQuantity(token, item.productId._id, "decrease");
      await fetchCart(token);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const handleRemove = async (item) => {
    const result = await removeFromCart(token, item.productId._id);
    if (result.success) {
      useCartStore.setState((state) => ({
        cartItems: state.cartItems.filter(
          (cartItem) => cartItem._id !== item._id
        ),
      }));
    } else {
      console.error("Failed to remove item:", result.message);
    }
  };

  const handleCheckout = () => {
    navigate("/placeorder");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">My Cart</h1>
      {loading ? (
        <Loading /> // Use the Loading component here
      ) : (
        <>
          {error && <p className="text-red-500">{error}</p>}
          {cartItems.length === 0 ? (
            <p className="text-center text-lg text-gray-600">Cart is empty.</p>
          ) : (
            <div className="max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg p-6">
              <ul className="space-y-6">
                {cartItems.map((item) => {
                  if (!item.productId) return null;
                  return (
                    <li
                      key={item._id}
                      className="flex flex-col md:flex-row items-center justify-between border-b border-gray-300 pb-4 last:border-b-0"
                    >
                      <div className="flex flex-col md:flex-row items-center space-x-4 w-full">
                        <img
                          src={`http://localhost:5000/images/${item.productId.image}`}
                          alt={item.productId.name}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1 text-center md:text-left">
                          <h3 className="text-lg font-semibold">
                            {item.productId.name}
                          </h3>
                          <p className="text-gray-600">
                            ${(item.productId.price * item.quantity).toFixed(2)}
                          </p>
                          <div className="flex justify-center md:justify-start items-center mt-2">
                            <button
                              onClick={() => handleDecrease(item)}
                              className="text-gray-600 hover:text-gray-800 mr-2"
                            >
                              <FaMinus />
                            </button>
                            <span className="text-lg font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item)}
                              className="text-gray-600 hover:text-gray-800 ml-2"
                            >
                              <FaPlus />
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 font-semibold mt-4 md:mt-0"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
              <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t border-gray-300 pt-4">
                <span className="text-lg font-bold mb-4 md:mb-0">
                  Total: ${total.toFixed(2)}
                </span>
                <div className="flex space-x-4">
                  <button
                    onClick={handleCheckout}
                    className="bg-green-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-500"
                  >
                    Proceed Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
