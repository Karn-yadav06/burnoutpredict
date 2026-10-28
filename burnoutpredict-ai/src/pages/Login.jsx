import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiCall } from "../config/api";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  // If already logged in, redirect to demo
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/demo");
    }
  }, [navigate]);

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (isRegister) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      } else if (!/\d/.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      } else if (!/[A-Z]/.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      }
    }

    if (isRegister) {
      if (!formData.name.trim()) {
        newErrors.name = "Full name is required";
      } else if (formData.name.trim().length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setSuccessMsg("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const endpoint = isRegister ? "/auth/register" : "/auth/login";
      const payload = isRegister 
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };
      
      const res = await apiCall(endpoint, {
        method: "POST",
        body: payload
      });

      if (res.success) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));
        
        // Signal navbar update
        window.dispatchEvent(new Event("auth-change"));
        
        setSuccessMsg(isRegister ? "Registration successful! Redirecting..." : "Login successful! Redirecting...");
        setTimeout(() => {
          navigate("/demo");
        }, 1500);
      }
    } catch (err) {
      console.error("Auth error:", err);
      if (err.errors && err.errors.length > 0) {
        const fieldErrors = {};
        err.errors.forEach(e => {
          fieldErrors[e.field] = e.message;
        });
        setErrors(fieldErrors);
      } else {
        setServerError(err.message || "Authentication failed. Please verify credentials.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center py-12 px-6">
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 border border-gray-100 transition hover:shadow-indigo-150">
          
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 tracking-tight mb-2">
            {isRegister ? "Create HR Account" : "HR Manager Login"}
          </h1>
          <p className="text-center text-gray-500 font-light text-sm mb-8">
            {isRegister 
              ? "Sign up to track and predict workplace burnout risks" 
              : "Access your employees workspace statistics dashboard"}
          </p>

          {serverError && (
            <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-4 rounded mb-6 text-sm">
              {serverError}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 text-green-700 border-l-4 border-green-500 p-4 rounded mb-6 text-sm">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="e.g. Jane Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Email Address</label>
              <input
                name="email"
                type="email"
                placeholder="e.g. manager@company.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase tracking-wider">Password</label>
              <input
                name="password"
                type="password"
                placeholder={isRegister ? "•••••••• (min 6 char, capital, number)" : "••••••••"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 hover:scale-[1.01] transition font-semibold shadow-lg focus:outline-none flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                isRegister ? "Register & Open Dashboard" : "Sign In"
              )}
            </button>
          </form>

          <p className="text-center mt-8 text-sm text-gray-600">
            {isRegister ? "Already have an account?" : "Add your company's space?"}{" "}
            <button
              onClick={() => {
                setIsRegister(!isRegister);
                setServerError("");
                setSuccessMsg("");
                setErrors({});
              }}
              className="text-indigo-650 font-bold hover:underline"
            >
              {isRegister ? "Sign In here" : "Register here"}
            </button>
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Login;