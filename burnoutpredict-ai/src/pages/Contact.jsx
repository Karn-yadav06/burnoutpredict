import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
      <Navbar />

      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">
            Contact Our Team
          </h1>

          <p className="mt-5 text-xl">
            Request a personalized demo for your organization.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

          <h2 className="text-3xl font-bold text-center mb-10">
            Book a Demo
          </h2>

          <form className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Company Name"
              className="border p-3 rounded-lg"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="border p-3 rounded-lg"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="border p-3 rounded-lg"
            />

            <input
              type="number"
              placeholder="Number of Employees"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Current HR Software"
              className="border p-3 rounded-lg"
            />

            <input
              type="text"
              placeholder="Industry"
              className="border p-3 rounded-lg md:col-span-2"
            />

            <textarea
              rows="5"
              placeholder="Business Requirements"
              className="border p-3 rounded-lg md:col-span-2"
            ></textarea>

            <button
              className="bg-blue-700 text-white py-4 rounded-lg md:col-span-2 hover:bg-blue-800 transition"
            >
              Request Demo
            </button>

          </form>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;