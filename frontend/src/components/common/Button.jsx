/* eslint-disable react/prop-types */

const Button = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-1 border border-brightColor text-brightColor hover:bg-brightColor hover:text-white transition-all rounded-full"
    >
      {title}
    </button>
  );
};

export default Button;

