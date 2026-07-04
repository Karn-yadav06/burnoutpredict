const SolutionCard = ({
  industry,
  problem,
  solution,
  benefit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold text-indigo-700 mb-4">
        {industry}
      </h2>

      <p className="mb-3">
        <strong>Problem:</strong> {problem}
      </p>

      <p className="mb-3">
        <strong>AI Solution:</strong> {solution}
      </p>

      <p>
        <strong>Benefit:</strong> {benefit}
      </p>

    </div>
  );
};

export default SolutionCard;