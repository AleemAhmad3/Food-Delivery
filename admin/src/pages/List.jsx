import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import toastify styles

const List = () => {
  const url = "https://food-delivery-nnwo.onrender.com";

  const [foodList, setFoodList] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false); // Ref to track if fetch has occurred

  const getList = async () => {
    console.log("Fetching food list..."); // Log fetching action
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setFoodList(response.data.data || []); // Ensure it's an array, even if undefined
        if (!hasFetched.current) {
          toast.success("Food list fetched successfully!");
          hasFetched.current = true; // Set to true to prevent further toasts
          console.log("Toast shown: Food list fetched successfully!"); // Log toast action
        }
      } else {
        toast.error(response.data.message || "Failed to fetch food items.");
      }
    } catch (error) {
      console.error("Error fetching food list:", error);
      toast.error("An error occurred while fetching the food list.");
    } finally {
      setLoading(false);
      console.log("Loading complete."); // Log when loading is complete
    }
  };

  // remove food function
  const removeFood = async (foodid) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodid });
    await getList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    console.log("Component mounted."); // Log component mount
    getList();
    return () => {
      hasFetched.current = false; // Reset on unmount
      console.log("Component unmounted."); // Log component unmount
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-brightColor rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-brightColor rounded-full animate-bounce delay-200"></div>
          <div className="w-4 h-4 bg-brightColor rounded-full animate-bounce delay-400"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Food List</h2>

      <div className="border">
        {/* Headings Row */}
        <div className="hidden md:flex font-bold mb-2 border-b-2 p-4 bg-slate-100">
          <div className="text-left w-1/5">Image</div>
          <div className="text-center w-1/5">Name</div>
          <div className="text-center w-1/5">Category</div>
          <div className="text-center w-1/5">Price</div>
          <div className="text-center w-1/5">Action</div>
        </div>

        {/* Food Items */}
        {foodList.length > 0 ? (
          foodList.map((food, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-center border-b p-2"
            >
              {/* Image */}
              <div className="text-center w-full md:w-1/5 mb-2 md:mb-0">
                {food.image ? (
                  <img
                    src={`${url}/images/${food.image}`}
                    alt={food.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  "No Image"
                )}
              </div>

              {/* Name */}
              <div className="text-center w-full md:w-1/5 mb-2 md:mb-0">
                {food.name}
              </div>

              {/* Category */}
              <div className="text-center w-full md:w-1/5 mb-2 md:mb-0">
                {food.category}
              </div>

              {/* Price */}
              <div className="text-center w-full md:w-1/5 mb-2 md:mb-0">
                ${food.price}
              </div>

              {/* Action */}
              <div className="text-center w-full md:w-1/5 mb-2 md:mb-0">
                <button
                  onClick={() => removeFood(food._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default List;
