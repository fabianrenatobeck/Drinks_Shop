// AuthPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function AuthPage() {
    const { loginWithEmail, loginWithGoogle, registerWithEmail } = useAuth();
    const [mode, setMode] = useState("login"); // "login" | "register"
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setErr("");
        setBusy(true);
        try {
            if (mode === "login") {
                await loginWithEmail({ email, password });
            } else {
                await registerWithEmail({ email, password, displayName });
            }
            navigate("/account");
        } catch (error) {
            setErr(error.message || "Fehler bei der Anmeldung.");
        } finally {
            setBusy(false);
        }
    };

    const onGoogle = async () => {
        setErr("");
        setBusy(true);
        try {
            await loginWithGoogle();
            navigate("/account");
        } catch (error) {
            setErr(error.message || "Google-Anmeldung fehlgeschlagen.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>{mode === "login" ? "Anmelden" : "Registrieren"}</h2>

                <div className="auth-toggle">
                    <button
                        className={`auth-tab ${mode === "login" ? "active" : ""}`}
                        onClick={() => setMode("login")}
                        type="button"
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${mode === "register" ? "active" : ""}`}
                        onClick={() => setMode("register")}
                        type="button"
                    >
                        Registrieren
                    </button>
                </div>

                {err && <div className="auth-error">{err}</div>}

                <form onSubmit={onSubmit} className="auth-form">
                    {mode === "register" && (
                        <div className="form-row">
                            <label>Anzeige-Name</label>
                            <input
                                type="text"
                                placeholder="Dein Name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="form-row">
                        <label>E-Mail</label>
                        <input
                            type="email"
                            placeholder="you@mail.ch"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-row">
                        <label>Passwort</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete={mode === "login" ? "current-password" : "new-password"}
                        />
                    </div>

                    <button className="btn-primary" disabled={busy}>
                        {busy ? "Bitte warten…" : mode === "login" ? "Einloggen" : "Registrieren"}
                    </button>
                </form>

                <div className="auth-sep">
                    <span>oder</span>
                </div>

                <button className="btn-google" onClick={onGoogle} disabled={busy}>
                    <span className="g-icon">G</span> Mit Google anmelden
                </button>
            </div>
        </div>
    );
}
