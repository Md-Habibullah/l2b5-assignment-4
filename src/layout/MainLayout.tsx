import { Footer } from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router";


const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;