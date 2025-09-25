import { http, HttpResponse } from "msw";

let token = "dev-token";
let user = { id: "u1", email: "dev@example.com", name: "Dev User", avatarUrl: null };

let products = [
    { id: 1, title: "Milch", person: "Berkay", status: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: 2, title: "Eier", person: "Maya", status: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
];

export const handlers = [
    http.post("/api/auth/login", async () => HttpResponse.json({ token, user })),
    http.post("/api/auth/google/mock", async () => HttpResponse.json({ token, user })),
    http.post("/api/auth/logout", async () => HttpResponse.json({ ok: true })),
    http.get("/api/auth/me", async () => HttpResponse.json(user)),

    http.get("/api/products", async () => HttpResponse.json(products)),
    http.post("/api/products", async ({ request }) => {
        const body = await request.json();
        const p = { id: Math.max(0, ...products.map(x => x.id)) + 1, title: body.title, person: body.person, status: false, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
        products = [p, ...products];
        return HttpResponse.json(p);
    }),
    http.patch("/api/products/:id", async ({ params, request }) => {
        const id = Number(params.id);
        const dto = await request.json();
        products = products.map(p => p.id === id ? { ...p, ...dto, updatedAt: new Date().toISOString() } : p);
        const p = products.find(p => p.id === id);
        return HttpResponse.json(p);
    }),
    http.delete("/api/products/:id", async ({ params }) => {
        const id = Number(params.id);
        products = products.filter(p => p.id !== id);
        return HttpResponse.json({ ok: true });
    })
];
