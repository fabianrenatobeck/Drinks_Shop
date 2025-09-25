import { useAuth } from "@/features/auth/AuthProvider";
import { Link } from "react-router-dom";

export default function NavUserMenu() {
    const { user, logout } = useAuth();
    return (
        <div className="flex items-center gap-3">
            <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border">
                {user?.avatarUrl
                    ? <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center bg-gray-200">👤</div>}
            </Link>
            <button className="btn btn-sm" onClick={logout}>Logout</button>
        </div>
    );
}
