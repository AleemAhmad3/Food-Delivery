import { useState, useEffect } from "react";
import DishesCard from "./common/DishesCard";
import axios from "axios";

// Utility function to get random dishes
const getRandomDishes = (dishes, count) => {
  let shuffled = [...dishes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const TopDishes = () => {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get('https://food-delivery-nnwo.onrender.com/api/food/list');
        // Set dishes to the data field in the response
        if (response.data.success) {
          setDishes(response.data.data); // Access the data array
        }
      } catch (error) {
        console.log(error);
            }
    };

    fetchDishes();
  }, []);

  // Get 8 random dishes
  const randomDishes = Array.isArray(dishes) ? getRandomDishes(dishes, 8) : [];

  return (
    <div className="text-center lg:h-screen px-4">
      <h1 className="font-bold mt-10 text-2xl sm:text-3xl mb-8 lg:mb-12">Top Dishes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {randomDishes.map((dish) => (
          <DishesCard
            key={dish._id}
            id={dish._id}
            img={`https://food-delivery-nnwo.onrender.com/images/${dish.image}`} // Ensure correct image URL
            title={dish.name}
            description={dish.description}
            price={dish.price}
          />
        ))}
      </div>
    </div>
  );
};

export default TopDishes;
