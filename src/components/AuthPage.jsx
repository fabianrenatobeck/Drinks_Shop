// AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const STORAGE_KEY = "limeli_auth_user_v1";

function loadUser() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

function saveUser(user) {
    try {
        if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        else localStorage.removeItem(STORAGE_KEY);
    } catch {}
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(loadUser());

    useEffect(() => {
        saveUser(user);
    }, [user]);

    // --- Mock API (später hier echte API/OAuth andocken) ---
    const loginWithEmail = async ({ email, password }) => {
        // TODO: Replace with backend call
        if (!email || !password) throw new Error("Bitte E-Mail & Passwort eingeben.");
        const mockUser = {
            uid: "local-" + email,
            email,
            displayName: email.split("@")[0],
            photoURL: null, // Base64 oder remote URL
            provider: "password",
        };
        setUser(mockUser);
        return mockUser;
    };

    const registerWithEmail = async ({ email, password, displayName }) => {
        // TODO: Replace with backend call
        if (!email || !password) throw new Error("Bitte E-Mail & Passwort eingeben.");
        const mockUser = {
            uid: "local-" + email,
            email,
            displayName: displayName || email.split("@")[0],
            photoURL: null,
            provider: "password",
        };
        setUser(mockUser);
        return mockUser;
    };

    const loginWithGoogle = async () => {
        // TODO: Replace with Google OAuth
        const mockUser = {
            uid: "google-123",
            email: "you@example.com",
            displayName: "Google User",
            photoURL: null,
            provider: "google",
        };
        setUser(mockUser);
        return mockUser;
    };

    const updateProfile = async ({ displayName, photoFile }) => {
        let photoURL = user?.photoURL || null;

        if (photoFile) {
            photoURL = await fileToBase64(photoFile); // lokal speichern
        }
        const updated = { ...user, displayName: displayName ?? user?.displayName, photoURL };
        setUser(updated);
        return updated;
    };

    const changePassword = async (_oldPwd, _newPwd) => {
        // TODO: Replace with backend call
        await new Promise((r) => setTimeout(r, 400));
        return true;
    };

    const logout = async () => {
        setUser(null);
    };

    const value = {
        user,
        isAuthenticated: !!user,
        loginWithEmail,
        registerWithEmail,
        loginWithGoogle,
        updateProfile,
        changePassword,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}

// helpers
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (e) => reject(e);
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}
