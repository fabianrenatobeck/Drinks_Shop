import ProductList from "@/components/ProductList";
import { useProducts, useCreateProduct } from "@/features/products/hooks";
import { useState } from "react";

export default function Home() {
    const { data, isLoading, error } = useProducts();
    const createMut = useCreateProduct();
    const [title, setTitle] = useState("");
    const [person, setPerson] = useState("");

    function addProduct(e) {
        e.preventDefault();
        if (!title.trim()) return;
        createMut.mutate({ title, person: person || undefined });
        setTitle(""); setPerson("");
    }

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            <form onSubmit={addProduct} className="flex gap-2">
                <input className="input input-bordered flex-1" placeholder="Produkt..." value={title} onChange={e => setTitle(e.target.value)} />
                <input className="input input-bordered w-40" placeholder="Person" value={person} onChange={e => setPerson(e.target.value)} />
                <button className="btn btn-primary">Hinzufügen</button>
            </form>

            {isLoading && <p>Laden...</p>}
            {error && <p className="text-red-600">Fehler beim Laden</p>}
            {data && <ProductList products={data} />}
        </div>
    );
}
