import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FeatureCard from "../components/FeatureCard";

const modules = [
  {
    title: "HR Dashboard",
    description:
      "A centralized dashboard providing HR teams with real-time workforce well-being insights.",
    icon: "💻"
  },
  {
    title: "Burnout Risk Engine",
    description:
      "AI continuously evaluates employee workload, attendance, and engagement to predict burnout.",
    icon: "🧠"
  },
  {
    title: "Employee Insights",
    description:
      "Track individual wellness trends while maintaining privacy and compliance.",
    icon: "👤"
  },
  {
    title: "Wellness Analytics",
    description:
      "Visual reports showing health scores, stress indicators, and engagement trends.",
    icon: "📊"
  },
  {
    title: "Team Health Dashboard",
    description:
      "Compare department-wise well-being and identify high-risk teams.",
    icon: "👥"
  },
  {
    title: "AI Recommendation Engine",
    description:
      "Receive intelligent recommendations to improve employee wellness.",
    icon: "💡"
  },
  {
    title: "Alerts & Notifications",
    description:
      "Automatic alerts notify HR when burnout risk crosses safe limits.",
    icon: "🔔"
  },
  {
    title: "Reports Center",
    description:
      "Download detailed HR analytics reports with charts and workforce insights.",
    icon: "📂"
  }
];

const Product = () => {
  return (
    <>
      <Navbar />

      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-5">
            BurnoutPredict AI Product
          </h1>

          <p className="text-xl max-w-3xl mx-auto font-light">
            AI-powered Employee Well-being Intelligence Platform that helps
            organizations detect burnout early and build healthier teams.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {modules.map((item, index) => (
              <FeatureCard
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Product;