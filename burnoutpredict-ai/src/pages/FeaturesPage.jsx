import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";
import featuresData from "../data/features";

const FeaturesPage = () => {
  return (
    <>
      <Navbar />

      <section className="bg-blue-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Features</h1>
        <p className="mt-4 text-xl max-w-3xl mx-auto">
          Powerful AI Features for Employee Well-being
        </p>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FeaturesPage;