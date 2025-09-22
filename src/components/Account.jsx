// Account.jsx
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function Account() {
    const { user, isAuthenticated, updateProfile, changePassword, logout } = useAuth();
    const [displayName, setDisplayName] = useState(user?.displayName || "");
    const [photoFile, setPhotoFile] = useState(null);
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState("");
    const [pwd1, setPwd1] = useState("");
    const [pwd2, setPwd2] = useState("");

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    const onSaveProfile = async (e) => {
        e.preventDefault();
        setMsg("");
        setBusy(true);
        try {
            await updateProfile({ displayName, photoFile });
            setPhotoFile(null);
            setMsg("Profil aktualisiert.");
        } catch (e) {
            setMsg("Konnte Profil nicht speichern.");
        } finally {
            setBusy(false);
        }
    };

    const onChangePassword = async (e) => {
        e.preventDefault();
        setMsg("");
        if (pwd1.length < 6 || pwd1 !== pwd2) {
            setMsg("Passwörter müssen übereinstimmen und min. 6 Zeichen haben.");
            return;
        }
        setBusy(true);
        try {
            await changePassword(null, pwd1); // Stub
            setPwd1("");
            setPwd2("");
            setMsg("Passwort aktualisiert.");
        } catch {
            setMsg("Passwortänderung fehlgeschlagen.");
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className="account-page">
            <div className="account-card">
                <h2>Dein Konto</h2>

                <div className="account-header">
                    <div className="avatar large">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || "User"} />
                        ) : (
                            <DefaultAvatar initials={(user?.displayName || "U")[0]} />
                        )}
                    </div>
                    <div>
                        <div className="account-name">{user?.displayName || "Nutzer"}</div>
                        <div className="account-email">{user?.email}</div>
                    </div>
                </div>

                {msg && <div className="account-msg">{msg}</div>}

                <form className="account-form" onSubmit={onSaveProfile}>
                    <h3>Profil</h3>
                    <div className="form-row">
                        <label>Anzeige-Name</label>
                        <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
                    </div>
                    <div className="form-row">
                        <label>Profilbild</label>
                        <input type="file" accept="image/*" onChange={(e) => setPhotoFile(e.target.files?.[0] || null)} />
                    </div>
                    <button className="btn-primary" disabled={busy}>
                        {busy ? "Speichern…" : "Profil speichern"}
                    </button>
                </form>

                <form className="account-form" onSubmit={onChangePassword}>
                    <h3>Passwort ändern</h3>
                    <div className="form-row">
                        <label>Neues Passwort</label>
                        <input type="password" value={pwd1} onChange={(e) => setPwd1(e.target.value)} />
                    </div>
                    <div className="form-row">
                        <label>Wiederholen</label>
                        <input type="password" value={pwd2} onChange={(e) => setPwd2(e.target.value)} />
                    </div>
                    <button className="btn-secondary" disabled={busy}>
                        {busy ? "Aktualisiere…" : "Passwort aktualisieren"}
                    </button>
                </form>

                <div className="account-actions">
                    <button className="btn-logout" onClick={logout}>Abmelden</button>
                </div>
            </div>
        </div>
    );
}

function DefaultAvatar({ initials = "U" }) {
    return (
        <div className="avatar-fallback">
            {initials.toUpperCase()}
        </div>
    );
}
