// Loading.jsx

const Loading = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-4 h-4 rounded-full bg-brightColor animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-brightColor animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-brightColor animate-bounce [animation-delay:-.5s]"></div>
        </div>
        <span className="text-lg font-semibold text-gray-700">Fetching delicious food...</span>
        <p className="mt-4 text-sm text-gray-400">Please wait while we prepare your menu!</p>
      </div>
    );
  };
  
  export default Loading;
  