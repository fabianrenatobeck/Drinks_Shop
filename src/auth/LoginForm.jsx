import { useState } from "react";
import { useAuth } from "./AuthProvider";

export default function LoginForm() {
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();
        setErr(null);
        setLoading(true);
        try {
            await login(email, password);
        } catch (e) {
            setErr(e?.message || "Login fehlgeschlagen");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 max-w-sm w-full">
            <div>
                <label className="block text-sm mb-1">E Mail</label>
                <input className="input input-bordered w-full" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
                <label className="block text-sm mb-1">Passwort</label>
                <input className="input input-bordered w-full" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {err && <p className="text-red-600 text-sm">{err}</p>}
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Anmeldung..." : "Anmelden"}</button>
            <div className="text-center text-sm">oder</div>
            <button type="button" className="btn w-full" onClick={loginWithGoogle}>Mit Google anmelden</button>
        </form>
    );
}
