import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
const [user, setUser] = useState({
      email: "",
      password: ""
    });
const BASE_URL = import.meta.env.VITE_APP_BACKEND_URL;
const navigate = useNavigate();
      function changeHandler(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(name , value);
  }
   async function submitHandler(e) {
  e.preventDefault();
  try {
    const res = await axios.post(`${BASE_URL}/login`, user);
    alert(res.data.msg || "Login successful ✅");

    navigate("/note");
  } catch (err) {
    alert(err.response?.data?.msg || "Something went wrong ❌");
    console.log(err);
  } finally {
    setUser({ email: "", password: "" });
  }
}
    
  return (
          <div className="min-h-screen flex items-center justify-center bg-white">
      {/* Card */}
      <div className="w-full max-w-md bg-[#D27D2D] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-white text-center">
          Welcome Back
        </h1>
        <p className="text-gray-100 text-center mb-8">
          Login to continue
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-white text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={changeHandler}
              required
              placeholder="email@email.com"
              className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#D27D2D] focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              required
              placeholder="********"
              className="w-full px-4 py-3 rounded-xl bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-[#D27D2D] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#A0522D] text-white py-3 rounded-xl font-bold hover:bg-white hover:text-[#A0522D] hover: border border-[#A0522D] border-2 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
