const steps = [
  {
    step: "01",
    title: "Connect Data Sources",
    description:
      "Integrate with your existing HRMS, attendance systems, and project management tools securely.",
  },
  {
    step: "02",
    title: "AI Analyzes Patterns",
    description:
      "Our AI engine continuously monitors workload, overtime, leave patterns, and engagement signals.",
  },
  {
    step: "03",
    title: "Predict Burnout Risk",
    description:
      "Each employee receives a real-time Burnout Risk Score — Low, Moderate, or High.",
  },
  {
    step: "04",
    title: "Take Action",
    description:
      "Receive AI-powered recommendations to reduce workload, encourage leave, or reassign projects.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">How It Works</h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            BurnoutPredict AI works in 4 simple steps to protect your workforce.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-xl transition"
            >
              <div className="text-5xl font-bold text-blue-700 mb-4">
                {item.step}
              </div>

              <h3 className="text-xl font-bold mb-3">{item.title}</h3>

              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
