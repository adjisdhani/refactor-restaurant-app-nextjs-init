"use client";

export default function BackButton() {
  return (
    <div className="mt-8 flex justify-center sm:justify-start">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
      >
        ← Back
      </button>
    </div>
  );
}
