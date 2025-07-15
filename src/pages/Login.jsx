import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);  // Gjendja për me tregu ose fsheh passwordin

  const handleLogin = async (e) => {
  e.preventDefault();

  try {
    // Merr CSRF cookie
    await fetch("http://localhost:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const res = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // aktivizon cookie
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Invalid credentials");

    const data = await res.json();
    login(data.user, data.token); // ose vetëm user nëse s'ka token
    navigate("/dashboard");
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#4B7ABF] to-[#6CA8E6] p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#4B7ABF] mb-6 text-center">Log in to your account</h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
                <input
                type="email"
                id="email"
                className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B7ABF]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                />
            </div>

            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-sm text-primary hover:underline"
                >
                {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>

            {/* 💡 Ketu vjen butoni i munguar */}
            <button
                type="submit"
                className="w-full bg-[#4B7ABF] text-white py-2 px-4 rounded-md hover:bg-[#3A6AA5] transition-colors"
            >
                Log In
            </button>
        </form>
      </div>
    </div>
  )
}

export default Login
