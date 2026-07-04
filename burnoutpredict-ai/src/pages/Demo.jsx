import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Demo = () => {
  return (
    <>
      <Navbar />

<section className="bg-sky-600 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <h1 className="text-6xl font-bold mb-6">
            Experience BurnoutPredict AI
          </h1>

          <p className="text-xl max-w-3xl mx-auto mb-10">
            Explore how Artificial Intelligence predicts burnout,
            improves employee well-being, and helps organizations
            build healthier and more productive teams.
          </p>

          <button className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition">
            Start Live Demo
          </button>

        </div>

      </section>

      <section className="py-20 bg-gray-100">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center mb-12">
            Demo Dashboard Preview
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-green-600">
                Wellness Score
              </h3>

              <p className="text-6xl font-bold mt-5">
                87%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-yellow-500">
                Moderate Risk
              </h3>

              <p className="text-6xl font-bold mt-5">
                14
              </p>

              <p className="mt-3">
                Employees
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-red-600">
                High Risk
              </h3>

              <p className="text-6xl font-bold mt-5">
                5
              </p>

              <p className="mt-3">
                Employees
              </p>
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Demo;