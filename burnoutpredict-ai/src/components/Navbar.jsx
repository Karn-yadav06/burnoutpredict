
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Watch for authentication changes
  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    };
    
    checkUser();
    
    // Listen to custom window events for logout / login transitions
    window.addEventListener("auth-change", checkUser);
    return () => window.removeEventListener("auth-change", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-change"));
    setMenuOpen(false);
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/product", label: "Product" },
    { to: "/solutions", label: "Solutions" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/ai-chat", label: "AI Chat" },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link to="/" className="text-3xl font-extrabold text-indigo-700 tracking-tight">
          BurnoutPredict AI
        </Link>

        



        <ul className="hidden md:flex gap-6 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="hover:text-indigo-700 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <span className="text-sm font-semibold text-gray-600 mr-2 bg-gray-100 py-1.5 px-3 rounded-full border">
                Hi, {user.name}
              </span>
              
              <Link
                to="/demo"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all shadow-md font-medium"
              >
                Predictor Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-50 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="border border-indigo-600 text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition font-medium"
              >
                Login
              </Link>

              <Link
                to="/demo"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Try Demo
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition"
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-750 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-750 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-gray-750 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-screen opacity-100 py-2 border-t" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6 pb-4 font-medium text-gray-700">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block py-3 px-4 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="flex flex-col gap-3 mt-3 pt-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="text-center font-bold text-gray-700 bg-gray-100 py-2 rounded-lg">
                  Hi, {user.name} ({user.role})
                </div>
                
                <Link
                  to="/demo"
                  onClick={() => setMenuOpen(false)}
                  className="text-center bg-indigo-650 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-750 transition"
                >
                  Predictor Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-center border border-red-500 text-red-500 px-4 py-2.5 rounded-lg hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center border border-indigo-600 text-indigo-600 px-4 py-2.5 rounded-lg hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/demo"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 text-center bg-indigo-600 text-white px-4 py-2.5 rounded-lg hover:bg-indigo-750 transition"
                >
                  Try Demo
                </Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;