import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const NotFound = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">Oops! Page Not Found</h2>
      <p className="text-lg text-gray-600 mb-6">
        The page you are looking for does not exist.
      </p>
      
      <button
        onClick={() => navigate("/")} // Navigate to homepage on button click
        className="px-6 py-2 bg-red-500 text-white font-semibold hover:bg-red-500 transition duration-300"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
