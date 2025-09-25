import { apiClient } from "@/lib/apiClient";
import { env } from "@/lib/env";

export function listProducts(token) {
    return apiClient.request(`${env.API_BASE_URL}/products`, { token });
}
export function createProduct(dto, token) {
    return apiClient.request(`${env.API_BASE_URL}/products`, { method: "POST", body: dto, token });
}
export function updateProduct(id, dto, token) {
    return apiClient.request(`${env.API_BASE_URL}/products/${id}`, { method: "PATCH", body: dto, token });
}
export function deleteProduct(id, token) {
    return apiClient.request(`${env.API_BASE_URL}/products/${id}`, { method: "DELETE", token });
}
