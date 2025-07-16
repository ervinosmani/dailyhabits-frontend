import { Link } from "react-router-dom";

function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#e6f0ff] to-white flex flex-col">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
                <h1 className="text-2xl font-bold text-[#4B7ABF]">Daily Habits</h1>
                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="text-[#4B7ABF] font-medium hover:underline transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-[#4B7ABF] text-white px-4 py-2 rounded hover:bg-[#3A6AA5] transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-grow flex items-center justify-center px-6 py-20">
                <div className="max-w-3xl text-center">
                    <h2 className="text-4xl sm:text-5xl font-bold text-[#2c3e50] mb-6">
                        Build Better Habits. Every Day.
                    </h2>
                    <p className="text-gray-700 text-lg sm:text-xl mb-10">
                        Stay consistent and achieve your goals with Daily Habits – your
                        personal habit tracker that keeps you focused, organized, and
                        motivated.
                    </p>
                    <div className="flex justify-center items-center gap-4">
                        <Link
                            to="/register"
                            className="bg-[#4B7ABF] text-white px-6 py-3 rounded-md text-lg hover:bg-[#3A6AA5] transition"
                        >
                            Create Account
                        </Link>
                        <Link
                            to="/login"
                            className="text-[#4B7ABF] font-medium text-lg hover:underline"
                        >
                            I already have an account
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );  
}

export default LandingPage