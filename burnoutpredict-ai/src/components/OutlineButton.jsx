const OutlineButton = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="border-2 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
    >
      {text}
    </button>
  );
};

export default OutlineButton;