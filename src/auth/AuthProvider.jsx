import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { env } from "@/lib/env";
import { apiClient } from "@/lib/apiClient";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const t = localStorage.getItem("token");
        async function load() {
            if (!t) { setLoading(false); return; }
            try {
                setToken(t);
                const me = await apiClient.request(`${env.API_BASE_URL}/auth/me`, { token: t });
                setUser(me);
            } catch {
                setUser(null);
                setToken(null);
                localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function login(email, password) {
        const res = await apiClient.request(`${env.API_BASE_URL}/auth/login`, {
            method: "POST",
            body: { email, password }
        });
        setToken(res.token);
        localStorage.setItem("token", res.token);
        setUser(res.user);
    }

    async function loginWithGoogle() {
        const res = await apiClient.request(`${env.API_BASE_URL}/auth/google/mock`, { method: "POST" });
        setToken(res.token);
        localStorage.setItem("token", res.token);
        setUser(res.user);
    }

    async function logout() {
        try {
            if (token) await apiClient.request(`${env.API_BASE_URL}/auth/logout`, { method: "POST", token });
        } finally {
            localStorage.removeItem("token");
            setToken(null);
            setUser(null);
        }
    }

    async function updateAvatar(file) {
        const url = URL.createObjectURL(file);
        setUser(prev => prev ? { ...prev, avatarUrl: url } : prev);
    }

    const value = useMemo(() => ({ user, token, loading, login, loginWithGoogle, logout, updateAvatar }), [user, token, loading]);
    return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthCtx);
    if (!ctx) throw new Error("useAuth nur innerhalb von AuthProvider");
    return ctx;
}
