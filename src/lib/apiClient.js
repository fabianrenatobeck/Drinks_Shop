class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.status = status;
        this.data = data;
    }
}

async function request(path, opts = {}) {
    const headers = { "Content-Type": "application/json" };
    if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

    const res = await fetch(path, {
        method: opts.method || "GET",
        headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
        credentials: "include"
    });

    const ct = res.headers.get("content-type") || "";
    const isJson = ct.includes("application/json");
    const data = isJson ? await res.json() : await res.text();

    if (!res.ok) {
        throw new ApiError(typeof data === "string" ? data : "Request fehlgeschlagen", res.status, data);
    }
    return data;
}

export const apiClient = { request, ApiError };
