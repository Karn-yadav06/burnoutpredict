const PrimaryButton = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
    >
      {text}
    </button>
  );
};

export default PrimaryButton;