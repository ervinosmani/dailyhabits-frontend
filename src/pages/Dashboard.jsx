import DashboardHeader from "../components/DashboardHeader";
import Sidebar from "../components/Sidebar";

function Dashboard() {

    return (
        // Pjesa kryesore e faqes me gradient dhe padding
        <div className="min-h-screen bg-gradient-to-tr from-[#e3f2fd] to-[#bbdefb] p-6">
            {/* Kuti qendrore e permbajtjes */}
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-6">

                <DashboardHeader />

                {/* Placeholder per permbajtje qe do te shtojme ne hapat tjere */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                    Feature 1 Coming soon
                </div>
                <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                    Feature 2 Coming soon
                </div>
                <div className="bg-[#e3f2fd] p-4 rounded-lg shadow text-center text-gray-700 font-semibold">
                    Feature 3 Coming soon
                </div>
                </div>

            </div>
            </div>
        );
        }

export default Dashboard;