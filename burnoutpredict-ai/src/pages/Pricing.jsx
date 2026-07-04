import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PricingCard from "../components/PricingCard";
import plans from "../data/pricing";

const Pricing = () => {
  return (
    <>
      <Navbar />

      <section className="bg-green-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">Pricing</h1>
        <p className="text-xl mt-5 max-w-2xl mx-auto">
          Flexible Pricing for Every Organization
        </p>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => (
              <PricingCard
                key={plan.id}
                plan={plan.plan}
                price={plan.price}
                description={plan.description}
                button={plan.button}
                featured={plan.featured}
                features={plan.features}
                buttonLink={plan.id === 3 ? "/contact" : "/demo"}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Pricing;