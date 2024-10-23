/* eslint-disable react/prop-types */
import DishesCard from "../components/common/DishesCard";

// Utility function to chunk array into rows
const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

const Menu = ({ foodItems }) => {
  // Define the headings for each row
  const headings = [
    "Salad",
    "Rolls",
    "Desserts",
    "Sandwich",
    "Cake",
    "Pure Veg",
    "Pasta",
    "Noodles",
  ];

  // Chunk the foodItems into rows of 4 items each
  const rows = chunkArray(foodItems, 4);

  return (
    <div className="min-h-screen flex flex-col items-center lg:px-32 px-5 relative">
      <h1 className="text-3xl md:text-4xl font-semibold text-center lg:pt-8 pt-24 pb-10">
        Our Menu
      </h1>

      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="w-full mb-12">
          {/* Use the heading from the array */}
          <h2 className="text-2xl font-semibold text-left mb-4">
            {headings[rowIndex] || `Category ${rowIndex + 1}`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {row.map((dish) => (
              <DishesCard
                key={dish._id}
                id={dish._id} // Ensure each dish has a unique identifier
                img={dish.imageUrl} // Use imageUrl for the dish image
                title={dish.name}
                description={dish.description}
                price={dish.price} // Assume price is a number, no template needed
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
