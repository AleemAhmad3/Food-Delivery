/* eslint-disable react/prop-types */
import Hero from "../components/Hero";
import ExploreMenu from "../components/ExploreMenu";
import TopDishes from "../components/TopDishes";
import WhyChoose from "../components/WhyChoose";
import Review from "../components/Review";

const Home = ({ foodItems }) => { // Accept foodItems as a prop
  return (
    <div>
      <Hero />
      <ExploreMenu foodItems={foodItems} /> {/* Pass foodItems to ExploreMenu if needed */}
      <TopDishes foodItems={foodItems} /> {/* Pass foodItems to TopDishes if needed */}
      <WhyChoose />
      <Review />
    </div>
  );
};

export default Home;
