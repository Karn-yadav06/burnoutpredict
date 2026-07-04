import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <section className="bg-purple-700 text-white py-20 text-center">
        <h1 className="text-5xl font-bold">
          About BurnoutPredict AI
        </h1>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">

        <h2 className="text-4xl font-bold mb-5">
          Our Story
        </h2>

        <p className="text-gray-600 leading-8">
          BurnoutPredict AI helps organizations identify burnout risks before
          they impact productivity, engagement, and retention.
        </p>

        <h2 className="text-4xl font-bold mt-16 mb-5">
          Mission
        </h2>

        <p className="text-gray-600">
          Build healthier workplaces using Artificial Intelligence.
        </p>

        <h2 className="text-4xl font-bold mt-16 mb-5">
          Vision
        </h2>

        <p className="text-gray-600">
          Become the world's leading Employee Well-being Intelligence Platform.
        </p>

        <h2 className="text-4xl font-bold mt-16 mb-5">
          Core Values
        </h2>

        <ul className="list-disc ml-6 space-y-3">
          <li>Employee First</li>
          <li>Privacy</li>
          <li>Trust</li>
          <li>Innovation</li>
          <li>Well-being</li>
          <li>Data Driven Decisions</li>
        </ul>

      </section>

      <Footer />
    </>
  );
};

export default About;