import React from "react";
import { useNavigate } from "react-router-dom";

 function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e666ff] text-white">
      <div className="w-full max-w-lg bg-[#571357] p-10 rounded-2xl shadow-2xl text-center border border-[#880099]">
        <div className="text-6xl mb-4">📒</div>
        <h1 className="text-4xl font-extrabold mb-3">Remind Me</h1>
        <p className="text-gray-200 mb-8">
          Take notes. Stay organized. Never forget again.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-[#880099] rounded-xl font-bold hover:bg-[#4b0726] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/users")}
            className="px-6 py-3 bg-[#d57fff] text-white rounded-xl font-bold hover:bg-[#ab00ff] transition"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
export default App;