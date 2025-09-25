import LoginForm from "@/features/auth/LoginForm";
import { useAuth } from "@/features/auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login() {
    const { user } = useAuth();
    if (user) return <Navigate to="/" replace />;
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <LoginForm />
        </div>
    );
}
