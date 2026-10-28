import { useState } from "react";

function AIChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNewChat = () => {
    setMessages([]);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim() || loading) return;

    const userMessage = message;
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "AI request failed");
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          question: userMessage,
          answer: data.reply,
        },
      ]);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto my-10 flex h-[80vh] w-full max-w-3xl flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-lg sm:p-8">

      {/* Header */}
      <div className="mb-6 flex shrink-0 items-center justify-between gap-3 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            BurnoutPredict AI
          </h2>

          <p className="mt-2 text-gray-500">
            Ask AI about employee burnout.
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewChat}
          className="shrink-0 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
        >
          + New Chat
        </button>
      </div>

      {/* Chat History */}
      <div className="mb-6 min-h-0 flex-1 space-y-5 overflow-y-auto pr-2">
        {messages.length === 0 && (
          <p className="py-10 text-center text-gray-400">
            Start a new conversation...
          </p>
        )}

        {messages.map((item, index) => (
          <div key={index} className="space-y-3">
            {/* User Question */}
            <div className="rounded-xl bg-indigo-100 p-4">
              <h3 className="mb-1 font-semibold text-indigo-900">
                You
              </h3>

              <p className="whitespace-pre-wrap text-gray-800">
                {item.question}
              </p>
            </div>

            {/* AI Answer */}
            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <h3 className="mb-1 font-semibold text-blue-900">
                AI Response
              </h3>

              <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="mt-auto shrink-0 space-y-4 border-t border-gray-200 pt-4"
      >
        <textarea
          placeholder="Ask something about burnout..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="3"
          className="w-full resize-none rounded-xl border border-gray-300 p-4 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        <button
          type="submit"
          disabled={loading || !message.trim()}
          className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "AI is thinking..." : "Ask AI"}
        </button>
      </form>

      {error && (
        <div className="mt-4 shrink-0 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          Error: {error}
        </div>
      )}
    </div>
  );
}

export default AIChat;