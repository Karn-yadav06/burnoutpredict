import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-blue-700 text-white py-20">

      <div className="max-w-5xl mx-auto px-6 text-center">

        <h2 className="text-5xl font-bold">
          Build Healthier Teams with AI
        </h2>

        <p className="mt-6 text-xl">
          Start detecting employee burnout before it impacts productivity.
        </p>

        <Link
          to="/demo"
          className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition"
        >
          Book Demo
        </Link>

      </div>

    </section>
  );
};

export default CTA;