import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white dark:bg-background">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">404 - Page Not Found</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
                Sorry, the page you’re looking for doesn’t exist.
            </p>
            <Button onClick={() => navigate("/")} className="bg-green-600 hover:bg-yellow-500">
                Go Back Home
            </Button>
        </div>
    );
};

export default NotFound;
