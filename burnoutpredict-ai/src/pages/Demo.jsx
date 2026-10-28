import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiCall } from "../config/api";

const Demo = () => {
  // Assessment fields
  const [formData, setFormData] = useState({
    employeeName: "",
    department: "Engineering",
    workloadLevel: 3,
    weeklyHours: 40,
    jobSatisfaction: 3,
    remoteWork: false,
    sickDays: 0
  });

  const [errors, setErrors] = useState({});
  const [isPredicting, setIsPredicting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentResult, setCurrentResult] = useState(null);
  
  // Dashboard logs
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  // Checking user profile state
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser(null);
      }
    }
    
    fetchPredictionHistory();
  }, []);

  const fetchPredictionHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const res = await apiCall("/predict");
      if (res.success && Array.isArray(res.predictions)) {
        // Deduplicate records by employee name (case-insensitive) to ensure 1 item per employee
        const seen = new Set();
        const unique = [];
        for (const item of res.predictions) {
          const key = item.employeeName?.trim().toLowerCase();
          if (key && !seen.has(key)) {
            seen.add(key);
            unique.push(item);
          }
        }
        setHistory(unique);
      }
    } catch (err) {
      console.error("Failed to load prediction logs:", err);
      // Fail-gracefully: load mock values if server communication fails initially
      setHistory([
        {
          id: "mock-1",
          employeeName: "Alice Miller",
          department: "Product",
          workloadLevel: 5,
          weeklyHours: 58,
          jobSatisfaction: 2,
          remoteWork: false,
          sickDays: 12,
          predictedScore: 78,
          riskLevel: "High",
          recommendation: "CRITICAL: Alice has a high risk of burnout primarily driven by excessive hours (58 hrs/week). Immediate action: Enforce dynamic caps on weekly working hours, reallocate tasks, and mandate recovery leave."
        },
        {
          id: "mock-2",
          employeeName: "Bob Smith",
          department: "Engineering",
          workloadLevel: 4,
          weeklyHours: 45,
          jobSatisfaction: 3,
          remoteWork: true,
          sickDays: 4,
          predictedScore: 54,
          riskLevel: "Medium",
          recommendation: "ALERT: Elevated risk detected. Recommend monitoring Bob's overtime, introducing flexible hour arrangements, and ensuring they do not work on weekends or holidays."
        },
        {
          id: "mock-3",
          employeeName: "Charlie Brown",
          department: "Marketing",
          workloadLevel: 2,
          weeklyHours: 38,
          jobSatisfaction: 4,
          remoteWork: true,
          sickDays: 1,
          predictedScore: 23,
          riskLevel: "Low",
          recommendation: "HEALTHY: Low burnout risks detected. Maintain active wellness communication. Suggest keeping an eye on job satisfaction factors to keep engagement high."
        }
      ]);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Helper to maintain exactly one output entry per employee in history
  const updateHistoryWithPrediction = (prevList, newPrediction) => {
    const targetName = newPrediction.employeeName?.trim().toLowerCase();

    // Check if this employee already exists in history (by id or case-insensitive employeeName)
    const existingIndex = prevList.findIndex(item => 
      (newPrediction.id && item.id === newPrediction.id) ||
      (item.employeeName && item.employeeName.trim().toLowerCase() === targetName)
    );

    if (existingIndex !== -1) {
      // Update the existing employee entry and move to top of the list
      const updatedItem = {
        ...prevList[existingIndex],
        ...newPrediction,
        id: newPrediction.id || prevList[existingIndex].id
      };
      const remaining = prevList.filter((_, idx) => idx !== existingIndex);
      return [updatedItem, ...remaining];
    }

    // New employee: remove mock entries if real data is entered
    const cleanList = prevList.filter(item => !item.id.toString().startsWith("mock-"));
    return [newPrediction, ...cleanList];
  };

  const handleEditEmployee = (item) => {
    setFormData({
      employeeName: item.employeeName,
      department: item.department || "Engineering",
      workloadLevel: item.workloadLevel || 3,
      weeklyHours: item.weeklyHours || 40,
      jobSatisfaction: item.jobSatisfaction || 3,
      remoteWork: Boolean(item.remoteWork),
      sickDays: item.sickDays || 0
    });
    setCurrentResult(item);
    setErrors({});
  };

  const handleResetForm = () => {
    setFormData({
      employeeName: "",
      department: "Engineering",
      workloadLevel: 3,
      weeklyHours: 40,
      jobSatisfaction: 3,
      remoteWork: false,
      sickDays: 0
    });
    setErrors({});
    setErrorMessage("");
  };

  const validateForm = () => {
    const errs = {};

    if (!formData.employeeName.trim()) {
      errs.employeeName = "Employee name is required";
    } else if (formData.employeeName.trim().length < 2) {
      errs.employeeName = "Name must be at least 2 characters";
    }

    if (!formData.department) {
      errs.department = "Department choice is required";
    }

    const hours = Number(formData.weeklyHours);
    if (isNaN(hours) || hours < 10 || hours > 100) {
      errs.weeklyHours = "Working hours must be between 10 and 100 weekly";
    }

    const sick = Number(formData.sickDays);
    if (isNaN(sick) || sick < 0 || sick > 300) {
      errs.sickDays = "Sick days must be a positive count under 300";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleRatingChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePredictSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setCurrentResult(null);

    if (!validateForm()) return;

    setIsPredicting(true);
    try {
      const payload = {
        employeeName: formData.employeeName,
        department: formData.department,
        workloadLevel: parseInt(formData.workloadLevel),
        weeklyHours: parseFloat(formData.weeklyHours),
        jobSatisfaction: parseInt(formData.jobSatisfaction),
        remoteWork: formData.remoteWork,
        sickDays: parseInt(formData.sickDays)
      };

      const res = await apiCall("/predict", {
        method: "POST",
        body: payload
      });

      if (res.success) {
        setCurrentResult(res.prediction);
        
        // Single output per person: update existing entry or add new
        setHistory(prev => updateHistoryWithPrediction(prev, res.prediction));
      }
    } catch (err) {
      console.error("Prediction error:", err);
      // Fallback calculation directly on client side if API fails
      if (err.status === 400 && err.errors) {
        const clientValErrors = {};
        err.errors.forEach(e => {
          clientValErrors[e.field] = e.message;
        });
        setErrors(clientValErrors);
      } else {
        setErrorMessage(err.message || "Failed to contact prediction engine. Showing simulated prediction instead.");
        simulateFrontendPrediction();
      }
    } finally {
      setIsPredicting(false);
    }
  };

  const simulateFrontendPrediction = () => {
    // Generate custom client-side simulation to guarantee active UX if backend disconnected
    const name = formData.employeeName.trim();
    const weeklyHours = parseFloat(formData.weeklyHours);
    const workloadLevel = parseInt(formData.workloadLevel);
    const jobSatisfaction = parseInt(formData.jobSatisfaction);
    const sickDays = parseInt(formData.sickDays);
    const remoteWork = formData.remoteWork;

    let score = workloadLevel * 8 + Math.max(0, (weeklyHours - 40) * 1.5) + (6 - jobSatisfaction) * 6 + Math.min(15, sickDays * 1.2) + (remoteWork ? -3 : 2);
    score = Math.max(0, Math.min(100, Math.round(score)));

    let riskLevel = 'Low';
    let recommendation = '';

    if (score >= 70) {
      riskLevel = 'High';
      recommendation = `CRITICAL: ${name} displays high indicators of over-exhaustion. Recommended: Scale back tasks immediately and verify workload caps.`;
    } else if (score >= 40) {
      riskLevel = 'Medium';
      recommendation = `ALERT: Moderate risk. Support dynamic schedules and review timelines.`;
    } else {
      riskLevel = 'Low';
      recommendation = `HEALTHY: Wellness levels are stable. Maintain good communication.`;
    }

    const existingItem = history.find(item => item.employeeName?.trim().toLowerCase() === name.toLowerCase());

    const simResult = {
      id: existingItem ? existingItem.id : "sim-" + Date.now(),
      userId: user?.id || "guest",
      employeeName: name,
      department: formData.department,
      workloadLevel,
      weeklyHours,
      jobSatisfaction,
      remoteWork,
      sickDays,
      predictedScore: score,
      riskLevel,
      recommendation,
      createdAt: existingItem?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setCurrentResult(simResult);
    setHistory(prev => updateHistoryWithPrediction(prev, simResult));
  };

  const handleDeleteHistory = async (id) => {
    if (id.toString().startsWith("mock-") || id.toString().startsWith("sim-")) {
      setHistory(prev => prev.filter(item => item.id !== id));
      return;
    }

    try {
      const res = await apiCall(`/predict/${id}`, {
        method: "DELETE"
      });
      if (res.success) {
        setHistory(prev => prev.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error("Failed to delete record:", err);
      // Remove anyway for quick updates
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  // Compute live aggregates from history
  const totalAssessed = history.length;
  const highRiskCount = history.filter(p => p.riskLevel === "High").length;
  const mediumRiskCount = history.filter(p => p.riskLevel === "Medium").length;
  
  // Wellness score calculated as: 100 - (average prediction score)
  const averageBurnout = totalAssessed 
    ? Math.round(history.reduce((acc, curr) => acc + curr.predictedScore, 0) / totalAssessed) 
    : 0;
  const overallWellnessScore = Math.max(0, 100 - averageBurnout);

  const getWellnessColor = (score) => {
    if (score >= 75) return "text-green-600 border-green-200 bg-green-50";
    if (score >= 50) return "text-yellow-600 border-yellow-200 bg-yellow-50";
    return "text-red-600 border-red-200 bg-red-50";
  };

  const getRiskBadgeColor = (risk) => {
    switch (risk) {
      case "High": return "bg-red-155 text-red-700 border border-red-200";
      case "Medium": return "bg-yellow-155 text-yellow-700 border border-yellow-200";
      default: return "bg-green-155 text-green-700 border border-green-200";
    }
  };

  const existingEmployee = history.find(
    item => item.employeeName?.trim().toLowerCase() === formData.employeeName?.trim().toLowerCase()
  );

  return (
    <>
      <Navbar />

      <section className="bg-indigo-700 text-white py-12 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">
              Burnout Risk Predictor Engine
            </h1>
            <p className="mt-2 text-indigo-100 max-w-2xl font-light">
              {user 
                ? `Welcome back, ${user.name}. You are logged in module: ${user.role}.` 
                : "Try the live dashboard. Sign up/Login to save predictions permanently across sessions."}
            </p>
          </div>
          {!user && (
            <a
              href="/login"
              className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-bold hover:bg-indigo-50 hover:scale-105 transition transform shadow-md"
            >
              Sign Up to Save Progress
            </a>
          )}
        </div>
      </section>

      {/* Aggregate metrics box */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-6">
            
            <div className={`p-6 bg-white rounded-xl shadow-md border flex flex-col justify-between ${totalAssessed > 0 ? 'border-indigo-150' : 'border-gray-200'}`}>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Workforce Assessed</h3>
              <p className="text-4xl font-black text-gray-800 mt-2">{totalAssessed}</p>
              <p className="text-xs text-gray-400 mt-1 font-light">Unique assessed employees</p>
            </div>

            <div className={`p-6 bg-white rounded-xl shadow-md border flex flex-col justify-between`}>
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Overall Wellness Index</h3>
              <div className="flex items-baseline mt-2 space-x-2">
                <span className="text-4xl font-black text-gray-800">{totalAssessed ? `${overallWellnessScore}%` : 'N/A'}</span>
                {totalAssessed > 0 && (
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${getWellnessColor(overallWellnessScore)}`}>
                    {overallWellnessScore >= 75 ? "Optimal" : overallWellnessScore >= 50 ? "Caution" : "Warning"}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light">Derived from assessed items</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col justify-between">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">Moderate Burnout Risks</h3>
              <div className="flex items-baseline mt-2 space-x-2">
                <p className="text-4xl font-black text-yellow-500">{mediumRiskCount}</p>
                {totalAssessed > 0 && (
                  <span className="text-xs text-gray-400">({Math.round((mediumRiskCount/totalAssessed)*100)}%)</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light">Awaiting supervisor check-ins</p>
            </div>

            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col justify-between">
              <h3 className="text-gray-400 text-xs font-semibold uppercase tracking-wider">High Burnout Risks</h3>
              <div className="flex items-baseline mt-2 space-x-2">
                <p className="text-4xl font-black text-red-500 animate-pulse">{highRiskCount}</p>
                {totalAssessed > 0 && (
                  <span className="text-xs text-gray-400">({Math.round((highRiskCount/totalAssessed)*100)}%)</span>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1 font-light">Require immediate intervention</p>
            </div>

          </div>
        </div>
      </section>

      {/* Main dashboard splits */}
      <section className="py-12 bg-gray-100 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-8">
          
          {/* Left panel: form */}
          <div className="lg:col-span-5 bg-white rounded-2xl shadow-lg p-6 border border-gray-200 h-fit">
            <div className="flex justify-between items-center border-b pb-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Employee Diagnostics Form
              </h2>
              {(formData.employeeName || formData.sickDays > 0) && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold hover:underline focus:outline-none"
                >
                  + New / Clear Form
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500 p-3 rounded mb-5 text-xs">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handlePredictSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Employee Name</label>
                <input
                  name="employeeName"
                  type="text"
                  list="existing-employees-list"
                  placeholder="e.g. Liam Lawson"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition text-sm ${errors.employeeName ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                />
                <datalist id="existing-employees-list">
                  {history.map(item => (
                    <option key={item.id} value={item.employeeName} />
                  ))}
                </datalist>
                {errors.employeeName && <p className="text-red-500 text-xs mt-1">{errors.employeeName}</p>}

                {existingEmployee && formData.employeeName.trim().length >= 2 && (
                  <div className="flex items-center justify-between text-xs text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg mt-2">
                    <span>
                      ℹ️ Existing record found for <strong>{existingEmployee.employeeName}</strong>. Output will update in place.
                    </span>
                    <button
                      type="button"
                      onClick={() => handleEditEmployee(existingEmployee)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold underline ml-2 text-nowrap"
                    >
                      Load Saved
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm bg-white"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Human Resources">HR</option>
                    <option value="Customer Support">Customer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Weekly Work Hours</label>
                  <input
                    name="weeklyHours"
                    type="number"
                    value={formData.weeklyHours}
                    onChange={handleInputChange}
                    placeholder="e.g. 40"
                    className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm ${errors.weeklyHours ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.weeklyHours && <p className="text-red-500 text-xs mt-1">{errors.weeklyHours}</p>}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider">Workload Level</label>
                  <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded border">
                    {formData.workloadLevel}/5 ({formData.workloadLevel <= 2 ? "Light" : formData.workloadLevel === 3 ? "Moderate" : "High"})
                  </span>
                </div>
                <input
                  name="workloadLevel"
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.workloadLevel}
                  onChange={handleInputChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Job Satisfaction Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      key={stars}
                      type="button"
                      onClick={() => handleRatingChange('jobSatisfaction', stars)}
                      className={`text-2xl transition-transform hover:scale-125 focus:outline-none ${stars <= formData.jobSatisfaction ? 'text-amber-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-gray-500 font-medium ml-2">
                    ({formData.jobSatisfaction === 1 ? "Very Dissatisfied" : formData.jobSatisfaction === 5 ? "Very Satisfied" : "Neutral"})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Sick Leaves (Term)</label>
                  <input
                    name="sickDays"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.sickDays}
                    onChange={handleInputChange}
                    className={`w-full border p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm ${errors.sickDays ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                  />
                  {errors.sickDays && <p className="text-red-500 text-xs mt-1">{errors.sickDays}</p>}
                </div>

                <div className="flex flex-col justify-center">
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Remote Status</label>
                  <label className="relative inline-flex items-center cursor-pointer mt-1">
                    <input
                      name="remoteWork"
                      type="checkbox"
                      checked={formData.remoteWork}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-650"></div>
                    <span className="ml-3 text-sm text-gray-700 font-medium">
                      {formData.remoteWork ? "Home-based" : "In-Office"}
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isPredicting}
                className={`w-full bg-indigo-600 text-white font-bold py-3.5 rounded-lg hover:bg-indigo-700 hover:scale-[1.01] transition shadow-lg flex items-center justify-center space-x-2 focus:outline-none ${isPredicting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isPredicting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>{existingEmployee ? "Updating Diagnostics..." : "Running Diagnostics Engine..."}</span>
                  </>
                ) : (
                  existingEmployee ? `Update Risk for ${existingEmployee.employeeName}` : "Calculate Burnout Risk"
                )}
              </button>

            </form>
          </div>

          {/* Right panel: results or log */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Active prediction result alert */}
            {currentResult && (
              <div className="bg-white rounded-2xl shadow-lg border border-indigo-150 p-6 relative overflow-hidden transition-all duration-300 transform scale-100">
                <button
                  onClick={() => setCurrentResult(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-sm font-semibold focus:outline-none"
                  aria-label="Dismiss active result"
                >
                  ✕ Close Assessment
                </button>
                
                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide border-b pb-2 mb-4 flex items-center justify-between">
                  <div>
                    Assessment Report: <span className="text-indigo-700">{currentResult.employeeName}</span>
                  </div>
                  {currentResult.updatedAt && currentResult.createdAt && currentResult.updatedAt !== currentResult.createdAt && (
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 font-semibold px-2.5 py-0.5 rounded-full mr-8">
                      Updated Record
                    </span>
                  )}
                </h3>

                <div className="grid md:grid-cols-12 gap-6 items-center">
                  
                  {/* Gauge card */}
                  <div className="md:col-span-4 flex flex-col items-center">
                    <div className={`w-28 h-28 rounded-full border-8 flex flex-col items-center justify-center shadow-inner ${
                      currentResult.predictedScore >= 70 ? 'border-red-400 bg-red-50 text-red-700' :
                      currentResult.predictedScore >= 40 ? 'border-yellow-400 bg-yellow-50 text-yellow-700' :
                      'border-green-400 bg-green-50 text-green-700'
                    }`}>
                      <span className="text-3xl font-black">{currentResult.predictedScore}%</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest mt-0.5">Risk Score</span>
                    </div>
                    <div className="mt-3.5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getRiskBadgeColor(currentResult.riskLevel)}`}>
                        {currentResult.riskLevel} Risk
                      </span>
                    </div>
                  </div>

                  {/* Recommendation column */}
                  <div className="md:col-span-8">
                    <h4 className="text-sm font-bold text-gray-500 mb-1">Algorithmic Insight</h4>
                    <p className="text-gray-700 text-sm leading-relaxed font-light">
                      {currentResult.recommendation}
                    </p>
                    
                    <div className="mt-4 flex gap-4 text-xs text-gray-500 italic bg-gray-55 border p-2.5 rounded">
                      <div>🏢 Dept: {currentResult.department}</div>
                      <div>⏰ {currentResult.weeklyHours}h/Wk</div>
                      <div>🤒 {currentResult.sickDays} Sick Days</div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* History Table logs */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-center border-b pb-3 mb-4">
                <h3 className="text-xl font-bold text-gray-800">
                  Assessments Log ({history.length})
                </h3>
                <button
                  onClick={fetchPredictionHistory}
                  className="text-xs text-indigo-650 hover:underline flex items-center space-x-1"
                  disabled={isLoadingHistory}
                >
                  {isLoadingHistory ? "Syncing..." : "🔄 Refresh Log"}
                </button>
              </div>

              {isLoadingHistory && history.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="w-8 h-8 border-4 border-indigo-700 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500 font-light">Loading database history logs...</p>
                </div>
              ) : history.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
                  <div className="text-5xl text-gray-300 mb-3 font-light">📊</div>
                  <p className="text-gray-700 text-lg font-bold mb-1">No Assessments Available</p>
                  <p className="text-gray-400 text-sm font-light max-w-xs mx-auto">
                    Fill the diagnostic form on the left to invoke the prediction model and record statistics.
                  </p>
                </div>
              ) : (
                <div className="flex-1 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        <th className="pb-3">Employee</th>
                        <th className="pb-3">Dept</th>
                        <th className="pb-3 text-center">Burnout Score</th>
                        <th className="pb-3 text-center">Class</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y text-gray-700 font-light">
                      {history.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition">
                          <td className="py-3">
                            <span className="font-bold text-gray-800 block text-nowrap">{item.employeeName}</span>
                            <span className="text-[10px] text-gray-400">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Active Demo'}</span>
                          </td>
                          <td className="py-3 text-gray-500 font-medium">
                            {item.department}
                          </td>
                          <td className="py-3 text-center">
                            <span className={`inline-block font-extrabold text-sm ${
                              item.predictedScore >= 70 ? 'text-red-600' :
                              item.predictedScore >= 40 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {item.predictedScore}%
                            </span>
                          </td>
                          <td className="py-3 text-center">
                            <span className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                              item.predictedScore >= 70 ? 'bg-red-50 text-red-700 border border-red-200' :
                              item.predictedScore >= 40 ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                              'bg-green-50 text-green-700 border border-green-200'
                            }`}>
                              {item.riskLevel}
                            </span>
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex justify-end gap-2.5">
                              <button
                                onClick={() => handleEditEmployee(item)}
                                className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold focus:outline-none"
                                title="Load details into diagnostics form"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => setCurrentResult(item)}
                                className="text-gray-600 hover:text-gray-800 text-xs font-semibold focus:outline-none"
                              >
                                Advice
                              </button>
                              <button
                                onClick={() => handleDeleteHistory(item.id)}
                                className="text-red-500 hover:text-red-700 text-xs font-semibold focus:outline-none"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default Demo;