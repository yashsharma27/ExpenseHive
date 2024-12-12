import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignUp() {

    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      rePassword: "",
    })

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [id]: value, // Updates the key matching the input `id`
      }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if(formData.password !== formData.rePassword){
        setError("Passwords do not match")
        return;
      }
      setError(null)
      setSuccess(null)

      try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        });
        
        const result = await response.json()

        if(!response.ok){
          setError(result.message || "Failed to signup")
          return;
        }

        setSuccess("Sign up successful! Redirecting to sign-in...");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);

      } catch (err: any) {
        setError(err.message || "An error occured")
      }
    }
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-1">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email ID
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Re-enter Password */}
            <div className="mb-4">
              <label htmlFor="repassword" className="block text-gray-700 mb-1">
                Re-enter Password
              </label>
              <input
                id="rePassword"
                type="password"
                value={formData.rePassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
  
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
