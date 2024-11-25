import { create } from 'zustand';
import axios from 'axios';

const useFoodStore = create((set) => ({
  foodItems: [],
  loading: false,
  error: null,
  fetchFoodItems: async () => {
    set({ loading: true });
    try {
      const response = await axios.get('https://food-delivery-nnwo.onrender.com/api/food/list');
      // Add image URL directly to each food item
      const foodItemsWithImages = response.data.data.map((item) => ({
        ...item,
        imageUrl: `https://food-delivery-nnwo.onrender.com/images/${item.image}`, // Construct image URL here
      }));
      set({ foodItems: foodItemsWithImages, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useFoodStore;
