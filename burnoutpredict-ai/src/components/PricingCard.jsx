import { Link } from "react-router-dom";

const PricingCard = ({
  plan,
  price,
  description,
  button,
  featured,
  features = [],
  buttonLink = "/demo",
}) => {
  return (
    <div
      className={`bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition flex flex-col ${
        featured ? "border-4 border-green-600 relative" : "border border-gray-200"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-sm font-bold px-4 py-1 rounded-full">
          Most Popular
        </div>
      )}

      <h2 className="text-3xl font-bold mb-3">{plan}</h2>

      <p className="text-gray-500 mb-4">{description}</p>

      <h3 className="text-5xl font-bold text-green-600 my-6">
        {price}
        {price !== "Custom" && (
          <span className="text-lg text-gray-500 font-normal"> /mo</span>
        )}
      </h3>

      {features.length > 0 && (
        <ul className="space-y-3 text-left mb-8 flex-1">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <span className="text-green-500 font-bold mt-0.5">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={buttonLink}
        className={`block w-full py-3 rounded-lg font-semibold transition text-center ${
          featured
            ? "bg-green-600 text-white hover:bg-green-700"
            : "border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
        }`}
      >
        {button}
      </Link>
    </div>
  );
};

export default PricingCard;