import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiCall } from "../config/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    employees: "",
    hrSoftware: "",
    industry: "",
    requirements: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successInfo, setSuccessInfo] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (formData.phone.trim()) {
      const phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
      if (!phoneRegex.test(formData.phone.trim())) {
        newErrors.phone = "Please enter a valid phone number";
      }
    }

    if (!formData.employees) {
      newErrors.employees = "Number of employees is required";
    } else {
      const empCount = parseInt(formData.employees);
      if (isNaN(empCount) || empCount < 1) {
        newErrors.employees = "Must be at least 1 employee";
      }
    }

    if (formData.requirements.trim() && formData.requirements.trim().length < 5) {
      newErrors.requirements = "Please elaborate a bit more (at least 5 characters)";
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
    
    // Clear validation error when user types
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

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        employees: parseInt(formData.employees)
      };
      
      const res = await apiCall("/contact", {
        method: "POST",
        body: payload
      });

      if (res.success) {
        setSuccessInfo(res.contact);
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          employees: "",
          hrSoftware: "",
          industry: "",
          requirements: ""
        });
      }
    } catch (err) {
      console.error("Booking error:", err);
      if (err.errors && err.errors.length > 0) {
        // Handle validation errors from backend
        const serverValidationErrors = {};
        err.errors.forEach(e => {
          serverValidationErrors[e.field] = e.message;
        });
        setErrors(serverValidationErrors);
      } else {
        setServerError(err.message || "Failed to submit demo request. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Contact Our Team
          </h1>
          <p className="mt-5 text-xl text-blue-100 max-w-2xl mx-auto font-light">
            Request a personalized demo and discover how BurnoutPredict AI can protect your organization.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition hover:shadow-2xl">
            
            {successInfo ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl mb-6 shadow-inner animate-bounce">
                  ✓
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4 animate-fade-in">
                  Demo Booked Successfully!
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto mb-8 font-light">
                  Thank you, <strong className="font-semibold text-gray-800">{successInfo.name}</strong> from <strong className="font-semibold text-gray-800">{successInfo.company}</strong>. 
                  Our workplace wellness specialists have received your inquiry for <strong className="text-indigo-600">{successInfo.employees}</strong> employees and will reach out to you at <strong className="text-gray-800">{successInfo.email}</strong> as soon as possible.
                </p>
                <button
                  onClick={() => setSuccessInfo(null)}
                  className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 hover:scale-105 transition transform shadow-md"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
                  Book a Demo
                </h2>
                <p className="text-center text-gray-500 mb-10 font-light max-w-md mx-auto">
                  Provide your workforce parameters to customize your preview dashboard experience.
                </p>

                {serverError && (
                  <div className="bg-red-50 text-red-700 border-l-4 border-red-500 p-4 rounded mb-6 text-sm">
                    {serverError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="e.g. Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                    <input
                      name="company"
                      type="text"
                      placeholder="e.g. Acme Corp"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.company ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.company && <p className="text-red-500 text-xs mt-1 font-medium">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. jane@acme.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="e.g. +1 555 123 4567"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Employees *</label>
                    <input
                      name="employees"
                      type="number"
                      placeholder="e.g. 250"
                      value={formData.employees}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.employees ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    />
                    {errors.employees && <p className="text-red-500 text-xs mt-1 font-medium">{errors.employees}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current HR Software</label>
                    <input
                      name="hrSoftware"
                      type="text"
                      placeholder="e.g. Workday, BambooHR"
                      value={formData.hrSoftware}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Industry</label>
                    <input
                      name="industry"
                      type="text"
                      placeholder="e.g. Technology, Healthcare, Finance"
                      value={formData.industry}
                      onChange={handleChange}
                      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Requirements</label>
                    <textarea
                      name="requirements"
                      rows="4"
                      placeholder="Briefly describe your team structure, primary burnout concerns, and specific integrations needed..."
                      value={formData.requirements}
                      onChange={handleChange}
                      className={`w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition ${errors.requirements ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                    ></textarea>
                    {errors.requirements && <p className="text-red-500 text-xs mt-1 font-medium">{errors.requirements}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-indigo-600 text-white py-4 rounded-lg md:col-span-2 hover:bg-indigo-700 hover:scale-[1.01] transition font-semibold shadow-lg focus:outline-none flex items-center justify-center space-x-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Requesting Demo...</span>
                      </>
                    ) : (
                      "Request Demo"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;