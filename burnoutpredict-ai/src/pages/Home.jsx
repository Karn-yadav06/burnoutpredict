import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import Problem from "../components/Problem";
import Solution from "../components/Solution";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import CustomerSuccess from "../components/CustomerSuccess";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-white">
      <Navbar />

      <Hero />

      <Statistics />

      <Problem />

      <Solution />

      <Features />

      <HowItWorks />

      <CustomerSuccess />

      <CTA />

      <Footer />
    </div>
  );
};

export default Home;