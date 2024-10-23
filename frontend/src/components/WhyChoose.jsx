import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import { FaArrowLeft } from "react-icons/fa"; // Import FontAwesome arrow icon
import img from "../assets/logocopy.png";
import Button from "./common/Button";

const WhyChoose = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get current route

  // Determine if the back arrow should be shown
  const showBackArrow = location.pathname !== "/";

  return (
    <div className="min-h-screen flex flex-col lg:flex-row justify-center items-center lg:px-32 px-5 mb-3 mt-10 relative">
      {/* Back Arrow Icon */}
      {showBackArrow && (
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-3xl text-gray-700 hover:text-brightColor"
        >
          <FaArrowLeft />
        </button>
      )}

      <img
        src={img}
        alt="About Us"
        className="w-full lg:w-1/2 mb-6 lg:mb-0 lg:max-h-[500px] object-cover"
      />

      <div className="space-y-4 lg:ml-6">
        <h1 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-center lg:text-left">
          Why Choose Us?
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-justify lg:text-left">
          At Food Order, we pride ourselves on delivering fresh,
          delicious meals right to your doorstep. Our commitment to quality
          starts with carefully sourced ingredients and extends to a seamless
          ordering experience. Whether you&apos;re craving a quick bite or a
          gourmet feast, our diverse menu is designed to satisfy every palate.
        </p>
        <p className="text-sm md:text-base lg:text-lg text-justify lg:text-left">
          We prioritize customer satisfaction with fast delivery, easy online
          ordering, and exceptional service. Enjoy convenience, quality, and
          taste all in one place, making us your top choice for online food
          orders.{" "}
        </p>
        <div className="flex justify-center lg:justify-start">
          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
