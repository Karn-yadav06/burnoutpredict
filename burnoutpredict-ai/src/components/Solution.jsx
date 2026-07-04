const Solution = () => {
  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-4xl font-bold text-blue-700">
            Meet BurnoutPredict AI
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            BurnoutPredict AI continuously analyzes employee work patterns
            using Artificial Intelligence to identify early warning signs
            before burnout affects productivity.
          </p>

        </div>

        <div className="mt-16 grid md:grid-cols-5 gap-6 text-center">

          <div className="bg-white p-6 rounded-xl shadow">
            Attendance
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            Meetings
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            Tasks
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            Work Hours
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            Feedback
          </div>

        </div>

        <div className="text-center mt-10 text-3xl font-bold text-blue-700">

          ↓

        </div>

        <div className="bg-blue-700 text-white text-center py-8 rounded-xl mt-6">

          <h3 className="text-3xl font-bold">
            BurnoutPredict AI
          </h3>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded-xl shadow text-center">
            Risk Analysis
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            Recommendations
          </div>

          <div className="bg-white p-6 rounded-xl shadow text-center">
            Healthier Teams
          </div>

        </div>

      </div>

    </section>
  );
};

export default Solution;