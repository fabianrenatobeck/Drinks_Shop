import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, listProducts, updateProduct } from "./api";
import { useAuth } from "@/features/auth/AuthProvider";

const QK = { products: ["products"] };

export function useProducts() {
    const { token } = useAuth();
    return useQuery({
        queryKey: QK.products,
        queryFn: () => listProducts(token || undefined)
    });
}

export function useCreateProduct() {
    const { token } = useAuth();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: dto => createProduct(dto, token || undefined),
        onSuccess: p => {
            qc.setQueryData(QK.products, old => old ? [p, ...old] : [p]);
        }
    });
}

export function useUpdateProduct() {
    const { token } = useAuth();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: ({ id, dto }) => updateProduct(id, dto, token || undefined),
        onMutate: async ({ id, dto }) => {
            await qc.cancelQueries({ queryKey: QK.products });
            const prev = qc.getQueryData(QK.products);
            qc.setQueryData(QK.products, old => old?.map(p => p.id === id ? { ...p, ...dto, updatedAt: new Date().toISOString() } : p) || []);
            return { prev };
        },
        onError: (_e, _v, ctx) => { if (ctx?.prev) qc.setQueryData(QK.products, ctx.prev); },
        onSettled: () => qc.invalidateQueries({ queryKey: QK.products })
    });
}

export function useDeleteProduct() {
    const { token } = useAuth();
    const qc = useQueryClient();
    return useMutation({
        mutationFn: id => deleteProduct(id, token || undefined),
        onMutate: async id => {
            await qc.cancelQueries({ queryKey: QK.products });
            const prev = qc.getQueryData(QK.products);
            qc.setQueryData(QK.products, old => old?.filter(p => p.id !== id) || []);
            return { prev };
        },
        onError: (_e, _id, ctx) => { if (ctx?.prev) qc.setQueryData(QK.products, ctx.prev); },
        onSettled: () => qc.invalidateQueries({ queryKey: QK.products })
    });
}
