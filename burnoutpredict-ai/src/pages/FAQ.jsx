import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FAQItem from "../components/FAQItem";
import faqData from "../data/faq";

const FAQ = () => {
  return (
    <>
      <Navbar />

      <section className="bg-blue-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">
          Frequently Asked Questions
        </h1>

        <p className="mt-5 text-xl max-w-3xl mx-auto">
          Find answers to common questions about BurnoutPredict AI.
        </p>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">

          <div className="space-y-4">
            {faqData.map((item) => (
              <FAQItem
                key={item.id}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default FAQ;