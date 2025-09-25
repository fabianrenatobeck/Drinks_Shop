import { useAuth } from "@/features/auth/AuthProvider";
import { useRef } from "react";

export default function Profile() {
    const { user, updateAvatar } = useAuth();
    const fileRef = useRef(null);
    if (!user) return null;

    function pick() { fileRef.current?.click(); }
    async function onFile(e) {
        const f = e.target.files?.[0];
        if (f) await updateAvatar(f);
    }

    return (
        <div className="max-w-lg mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-semibold">Profil</h1>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full overflow-hidden border">
                    {user.avatarUrl ? <img src={user.avatarUrl} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-gray-200">👤</div>}
                </div>
                <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm opacity-80">{user.email}</p>
                </div>
            </div>
            <div className="space-x-2">
                <button className="btn" onClick={pick}>Profilbild ändern</button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
            </div>
        </div>
    );
}
