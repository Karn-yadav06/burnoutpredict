import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-14">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold mb-4">
            BurnoutPredict AI
          </h2>

          <p className="text-gray-400">
            Predict. Prevent. Protect.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Product</h3>

          <ul className="space-y-2 text-gray-400">
            <li><Link to="/product">Product</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Company</h3>

          <ul className="space-y-2 text-gray-400">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Follow Us</h3>

          <ul className="space-y-2 text-gray-400">
            <li>LinkedIn</li>
            <li>GitHub</li>
            <li>YouTube</li>
            <li>X (Twitter)</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">
        © 2026 BurnoutPredict AI. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;