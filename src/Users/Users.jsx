import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Users() {
const [user, setUser] = useState({
     firstName: "",
      lastName: "",
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
    const res = await axios.post(`${BASE_URL}/register`, user);
    alert(res.data.msg || "User registered successfully ✅");

    navigate("/note");
  } catch (err) {
    alert(err.response?.data?.msg || "Something went wrong ❌");
    console.log(err);
  } finally {
    setUser({ firstName: "", lastName: "", email: "", password: "" });
  }
}
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e666ff]">
      {/* Card */}
      <div className="w-full max-w-md bg-[#571357] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-extrabold text-white text-center">
          Create Account
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Sign up to get started
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* First Name */}
          <div>
            <label className="block text-white text-sm mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={changeHandler}
              required
              placeholder="John"
              className="w-full px-4 py-3 rounded-xl bg-[#d57fff] text-white placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-white text-sm mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={changeHandler}
              required
              placeholder="Doe"
              className="w-full px-4 py-3 rounded-xl bg-[#d57fff] text-white placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
            />
          </div>

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
              className="w-full px-4 py-3 rounded-xl bg-[#d57fff] text-white placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
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
              className="w-full px-4 py-3 rounded-xl bg-[#d57fff] text-white placeholder-white focus:ring-2 focus:ring-[#ab00ff] focus:outline-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#880099] text-white py-3 rounded-xl font-bold hover:bg-[#c400cc] transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default Users
