import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

// Komponenti qe perfaqeson skeletin e faqes se Dashboard-it
export default function Layout() {
    return (
        // Layout horizontal me flex: Sidebar ne te majte, permbajtja ne te djathte
        <div className="flex h-screen bg-gray-100">

            {/* Sidebar ne anen e majte */}
            <Sidebar />

            {/* Permbajtja qe ndryshon sipas faqes se zgjedhur */}
            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}