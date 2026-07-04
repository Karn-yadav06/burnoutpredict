const Problem = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold text-gray-800">
            The Hidden Cost of Employee Burnout
          </h2>

          <p className="mt-5 text-lg text-gray-600 max-w-3xl mx-auto">
            Employee burnout is one of the biggest challenges organizations
            face today. Most companies only realize an employee is struggling
            after productivity declines or resignation happens.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
              alt="Employee Stress"
              className="rounded-xl shadow-lg"
            />

          </div>

          <div>

            <div className="space-y-5">

              <div className="bg-red-100 p-4 rounded-lg font-semibold">
                📉 Performance Drops
              </div>

              <div className="bg-yellow-100 p-4 rounded-lg font-semibold">
                😓 Increased Absenteeism
              </div>

              <div className="bg-orange-100 p-4 rounded-lg font-semibold">
                ⚠️ Missed Deadlines
              </div>

              <div className="bg-purple-100 p-4 rounded-lg font-semibold">
                🤝 Team Conflicts
              </div>

              <div className="bg-gray-100 p-4 rounded-lg font-semibold">
                ❌ Employee Resignation
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Problem;