import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SolutionCard from "../components/SolutionCard";
import solutions from "../data/solutions";

const Solutions = () => {
  return (
    <>
      <Navbar />

      <section className="bg-indigo-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Solutions</h1>
        <p className="mt-5 text-xl max-w-3xl mx-auto">
          AI Solutions for Every Industry
        </p>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((item, index) => (
              <SolutionCard
                key={index}
                industry={item.industry}
                problem={item.problem}
                solution={item.solution}
                benefit={item.benefit}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Solutions;