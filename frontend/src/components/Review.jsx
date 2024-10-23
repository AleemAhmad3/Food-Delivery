
import ReviewCard from "./common/ReviewCard";
import img1 from "../assets/pic1.png";
import img2 from "../assets/pic2.png";
import img3 from "../assets/pic3.png";

const Review = () => {
  
  // Determine if the back arrow should be shown

  return (
    <div className=" flex flex-col items-center justify-center relative md:px-16 px-5 mb-28">
     

      <h1 className="text-3xl md:text-4xl font-semibold text-center  pb-10">
        Customer Reviews
      </h1>

      {/* Review Cards */}
      <div className="flex flex-col md:flex-row gap-8 lg:gap-10 mt-5 w-full lg:w-10/12 justify-center">
        <ReviewCard img={img1} name="Sophia Azura" />
        <ReviewCard img={img2} name="John Deo" />
        <ReviewCard img={img3} name="Victoria Zoe" />
      </div>
    </div>
  );
};

export default Review;
