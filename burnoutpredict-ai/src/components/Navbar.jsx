import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Product" },
    { to: "/solutions", label: "Solutions" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="text-3xl font-bold text-blue-700">
          BurnoutPredict AI
        </Link>

        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-blue-700 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-3">
          <Link
            to="/login"
            className="border border-blue-700 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition"
          >
            Login
          </Link>

          <Link
            to="/demo"
            className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
          >
            Book Demo
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
                menuOpen ? "opacity-100" : "opacity-0"        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-4 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="flex gap-3 mt-3 pt-3 border-t border-gray-200">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center border border-blue-700 text-blue-700 px-4 py-2.5 rounded-lg hover:bg-blue-700 hover:text-white transition"
            >
              Login
            </Link>

            <Link
              to="/demo"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center bg-blue-700 text-white px-4 py-2.5 rounded-lg hover:bg-blue-800 transition"
            >
              Book Demo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;