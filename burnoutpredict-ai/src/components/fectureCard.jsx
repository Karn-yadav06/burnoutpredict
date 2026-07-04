const FeatureCard = ({ title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">
        {title}
      </h3>

      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;