import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    // Marrim funksionin login nga context qe ta perdorim pas regjistrimit
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    // Gjendja per fushat e formes
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Gjendje per gabime dhe per ta shfaqur ose fshehur fjalekalimin
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Funksioni per te perditesuar vlerat e inputeve
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Funksioni per dergimin e te dhenave per regjistrim
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");   // Pastrojme cdo gabim ekzistues

        try {
            // Marrim CSRF cookie (kerkohet nga Laravel Sanctum)
            await fetch("http://localhost:8000/sanctum/csrf-cookie", {
                credentials: "include",
            });

            // Bejme POST kerkese per regjistrim
            const res = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                credentials: "include", // per cookies e autentikimit
                body: JSON.stringify(formData),
            });

            // Kontrollojme nese ka ndonje gabim nga backend
            if (!res.ok) {
                const data = await res.json();
                if (res.status === 422) {
                    setError(data.message || "Please check the fields and try again.");
                } else {
                    throw new Error("Something went wrong. Please try again.");
                }
                return;
            }

            // Nese regjistrimi ishte i suksesshem
            const data = await res.json();
            login(data.user);   // Autentikojme automatikisht perdoruesin
            navigate("/login")  // E ridrejtojme te login page
        } catch (err) {
            // Nese ka problem me lidhjen me serverin
            setError("Could not connect to the server. Please try again later.");
        }
    };                
    
    return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#4B7ABF] to-[#6CA8E6] p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-[#4B7ABF] mb-6 text-center">
          Create an account
        </h2>

        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-100 p-3 rounded-md border border-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B7ABF]"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B7ABF]"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B7ABF]"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password_confirmation" className="block text-gray-700 font-medium">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password_confirmation"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B7ABF]"
              required
            />
          </div>

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="text-sm text-[#4B7ABF] hover:underline"
          >
            {showPassword ? "Hide Passwords" : "Show Passwords"}
          </button>

          <button
            type="submit"
            className="w-full bg-[#4B7ABF] text-white py-2 px-4 rounded-md hover:bg-[#3A6AA5] transition-colors"
          >
            Register
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-[#4B7ABF] hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
