const Statistics = () => {
  const stats = [
    {
      number: "45%",
      title: "Lower Employee Turnover",
    },
    {
      number: "70%",
      title: "Earlier Burnout Detection",
    },
    {
      number: "32%",
      title: "Higher Employee Engagement",
    },
    {
      number: "92%",
      title: "HR Satisfaction",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-8 text-center hover:shadow-2xl transition"
            >

              <h2 className="text-5xl font-bold text-blue-700">
                {item.number}
              </h2>

              <p className="mt-4 text-gray-600 font-medium">
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Statistics;