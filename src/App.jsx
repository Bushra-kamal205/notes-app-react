import React from "react";
import { useNavigate } from "react-router-dom";

 function App() {
  const navigate = useNavigate();

  return (
   <div className="min-h-screen flex items-center justify-center bg-white text-white">
  <div className="w-11/12 sm:w-10/12 md:w-full max-w-lg bg-[#D27D2D] p-10 rounded-2xl shadow-2xl text-center border border-[#D27D2D]">
    <div className="text-6xl mb-4">📒</div>
    <h1 className="text-4xl font-extrabold mb-3">Remind Me</h1>
    <p className="text-gray-100 mb-8">
      Take notes. Stay organized. Never forget again.
    </p>
    <div className="flex gap-4 justify-center">
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-3 bg-[#A0522D] rounded-xl font-bold hover:bg-white hover:text-[#A0522D] transition"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/users")}
        className="px-6 py-3 bg-white text-[#A0522D] rounded-xl font-bold hover:bg-[#A0522D] hover:text-white transition"
      >
        Sign Up
      </button>
    </div>
  </div>
</div>

  );
}
export default App;