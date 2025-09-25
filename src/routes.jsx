import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import { useAuth } from "@/features/auth/AuthProvider";

function PrivateRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return <div className="p-6">Laden...</div>;
    return user ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}
