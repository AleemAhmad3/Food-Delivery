import { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const url = "https://food-delivery-nnwo.onrender.com";

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the selected image file
  };

  const handleImageClick = () => {
    document.getElementById("imageUpload").click(); // Trigger the file input click
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("An error occurred. Please try again later.");
    }

    // Clear the form after submission
    setImage(null);
    setName("");
    setDescription("");
    setCategory("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4 max-w-md mx-auto w-full">
      {/* Image Upload */}
      <div className="flex flex-col items-center">
        <label className="mb-2 text-lg">Upload Photo</label>
        <img
          src={image ? URL.createObjectURL(image) : assets.upload_area}
          onClick={handleImageClick}
          className="border w-24 h-16 cursor-pointer rounded-lg mb-2"
          alt="Upload Area"
        />
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      {/* Product Name */}
      <div className="flex flex-col">
        <label className="mb-2 text-lg">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded-sm p-2"
          required
        />
      </div>

      {/* Product Description */}
      <div className="flex flex-col">
        <label className="mb-2 text-lg">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border rounded-sm p-2"
          required
        />
      </div>

      {/* Product Category and Price */}
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="flex flex-col w-full md:w-1/2">
          <label className="mb-2 text-lg">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-sm p-2"
            required
          >
            <option value="">Select a category</option>
            <option value="Salad">Salad</option>
            <option value="Rolls">Rolls</option>
            <option value="Deserts">Deserts</option>
            <option value="Sandwich">Sandwich</option>
            <option value="Cake">Cake</option>
            <option value="PureVeg">PureVeg</option>
            <option value="Pasta">Pasta</option>
            <option value="Noodles">Noodles</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-1/2">
          <label className="mb-2 text-lg">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-sm p-2"
            required
          />
        </div>
      </div>

      {/* Add Button */}
      <button
        type="submit"
        className="bg-zinc-800 text-white py-2 px-3 rounded-sm hover:bg-zinc-950 transition duration-300 w-full"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
