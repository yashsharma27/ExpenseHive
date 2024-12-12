import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SignIp() {

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {id, value} = e.target
      setFormData((prevData) => ({...prevData, [id]: value}))
    }

    const [formData, setFormData] = useState({
      email: "",
      password: "",
    })

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); 
      try {
        const response = await fetch("http://localhost:5000/api/auth/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await response.json();

        if(!response.ok){
          setError("Invalid Credentials")
          return;
        }

        setError(null)
        setSuccess(null)

        setSuccess("Sign up successful! Redirecting to dashboard...");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      } catch (err: any) {
        console.log(err.message)
        setError("Unable to signIn")    
      }
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg border w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="text"
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
  
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
