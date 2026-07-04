import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Login = () => {
  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-xl w-full max-w-md p-10">

          <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
            Login
          </h1>

          <form className="space-y-5">

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-3 rounded-lg"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border p-3 rounded-lg"
            />

            <button
              className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-6 text-gray-500">
            Forgot Password?
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
};

export default Login;