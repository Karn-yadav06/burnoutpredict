const CustomerSuccess = () => {
  return (
    <section className="py-20">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

          <h2 className="text-4xl font-bold">
            Customer Success
          </h2>

          <p className="mt-4 text-gray-600">
            Organizations achieved measurable improvements after using BurnoutPredict AI.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-red-50 rounded-xl p-8 shadow-lg">

            <h3 className="text-3xl font-bold text-red-600 mb-6">
              Before
            </h3>

            <ul className="space-y-3">
              <li>Turnover Rate : 22%</li>
              <li>Average Sick Leaves : 14 Days</li>
              <li>Employee Engagement : 54%</li>
            </ul>

          </div>

          <div className="bg-green-50 rounded-xl p-8 shadow-lg">

            <h3 className="text-3xl font-bold text-green-600 mb-6">
              After
            </h3>

            <ul className="space-y-3">
              <li>Turnover Rate : 11%</li>
              <li>Average Sick Leaves : 8 Days</li>
              <li>Employee Engagement : 82%</li>
            </ul>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CustomerSuccess;