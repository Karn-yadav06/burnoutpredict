import FeatureCard from "./FeatureCard";
import featuresData from "../data/features";

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-gray-800">
            Powerful Features
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Everything HR teams need to predict and prevent employee burnout early.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default Features;