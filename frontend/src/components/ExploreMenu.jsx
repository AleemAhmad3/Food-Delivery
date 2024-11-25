import { useState, useEffect } from "react";
import { menu_list } from "../assets/assets.js"; // Keep this if you're still using static menu data
import DishesCard from "./common/DishesCard";
import axios from "axios"; // Import axios or use fetch API

const ExploreMenu = () => {
  const [selectedCategory, setSelectedCategory] = useState(menu_list[0].menu_name);
  const [foodItems, setFoodItems] = useState([]); // State for fetched food items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch food items from the backend
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("https://food-delivery-nnwo.onrender.com/api/food/list");
        setFoodItems(response.data.data); // Adjust according to your API response structure
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, []);

  // Filter dishes based on the selected category
  const filteredDishes = foodItems.filter(food => food.category === selectedCategory);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Get unique categories from food items
  const uniqueCategories = Array.from(new Set(foodItems.map(item => item.category)));

  return (
    <div className="text-center lg:h-screen">
      <h1 className="font-bold mt-10 text-3xl mb-12">Explore Our Menu</h1>
      <div className="flex flex-wrap justify-center gap-8 mb-12">
        {uniqueCategories.map((category, index) => {
          // Find the corresponding menu item for the category, normalizing case and spaces
          const categoryItem = menu_list.find(item => item.menu_name.toLowerCase().trim() === category.toLowerCase().trim());

          return (
            <div
              key={index}
              className={`w-28 h-28 mb-5 flex flex-col items-center cursor-pointer relative ${
                selectedCategory === category ? "border-4 border-brightColor rounded-full p-1" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              <img
                src={categoryItem?.menu_image || "path/to/fallback/image.png"} // Use a fallback image
                alt={category}
                className="w-full h-full object-cover rounded-full"
              />
              <p className="text-lg font-medium mt-2">{category}</p>
            </div>
          );
        })}
      </div>

      {/* Display related dishes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDishes.map(dish => (
          <DishesCard
            key={dish._id}
            id={dish._id}
            img={`https://food-delivery-nnwo.onrender.com/images/${dish.image}`} // Update the image source
            title={dish.name}
            description={dish.description}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
