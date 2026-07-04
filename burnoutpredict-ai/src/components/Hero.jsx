import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-blue-700 text-white py-24">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Predict Burnout Before It Becomes Resignation.
          </h1>

          <p className="mt-6 text-xl text-gray-200">
            Monitor employee well-being using Artificial Intelligence.
            Detect burnout risks early, improve productivity,
            reduce employee turnover, and build healthier teams.
          </p>

          <div className="mt-8 flex gap-4">

            <Link
              to="/demo"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              Book Demo
            </Link>

            <Link
              to="/demo"
              className="border border-white px-6 py-3 rounded-lg"
            >
              Try Demo Dashboard
            </Link>

          </div>

        </div>

        <div className="flex justify-center">

          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
            alt="Employee Wellness"
            className="rounded-xl shadow-xl"
          />

        </div>

      </div>

    </section>
  );
};

export default Hero;