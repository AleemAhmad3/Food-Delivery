import { useEffect } from 'react';
import Navbar from "./components/common/Navbar";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/common/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFoodStore from './store/FoodStore'; // Adjust the import based on your file structure
import Loading from './components/common/Loading'; // Adjust the import path as needed

const App = () => {
  const { fetchFoodItems, foodItems, loading, error } = useFoodStore();

  useEffect(() => {
    fetchFoodItems();
  }, [fetchFoodItems]);

  if (loading) return <Loading />; // Use the Loading component
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ToastContainer />
      <Navbar />
      <AppRoutes foodItems={foodItems} /> {/* Pass foodItems to your routes if needed */}
      <Footer />
    </>
  );
};

export default App;
