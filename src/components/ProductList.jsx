import { useState } from "react";
import { useDeleteProduct, useUpdateProduct } from "@/features/products/hooks";

export default function ProductList({ products }) {
    if (!products?.length) return <p>Keine Produkte erfasst.</p>;
    return (
        <div className="grid gap-3">
            {products.map(p => <ProductRow key={p.id} p={p} />)}
        </div>
    );
}

function ProductRow({ p }) {
    const upd = useUpdateProduct();
    const del = useDeleteProduct();
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(p.title);
    const [person, setPerson] = useState(p.person || "");

    function toggleStatus() {
        upd.mutate({ id: p.id, dto: { status: !p.status } });
    }

    function saveEdit() {
        const dto = {};
        if (title !== p.title) dto.title = title;
        if ((person || undefined) !== p.person) dto.person = person || undefined;
        if (Object.keys(dto).length) upd.mutate({ id: p.id, dto });
        setEditing(false);
    }

    return (
        <div className="card">
            <div className="card-body flex items-start justify-between">
                <div className="flex-1">
                    {!editing ? (
                        <>
                            <h2 className={`card-title ${p.status ? "line-through" : ""}`}>{p.title}</h2>
                            <p className="text-sm opacity-80">Person: {p.person || "keine"}</p>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <input className="input input-bordered" value={title} onChange={e => setTitle(e.target.value)} />
                            <input className="input input-bordered" value={person} onChange={e => setPerson(e.target.value)} placeholder="Person" />
                        </div>
                    )}
                </div>
                <div className="flex gap-2">
                    {!editing ? (
                        <>
                            <button className="btn btn-ghost" onClick={() => setEditing(true)}>Bearbeiten</button>
                            <button className="btn" onClick={toggleStatus}>{p.status ? "Reaktivieren" : "Erledigt"}</button>
                        </>
                    ) : (
                        <>
                            <button className="btn btn-primary" onClick={saveEdit}>Speichern</button>
                            <button className="btn btn-ghost" onClick={() => setEditing(false)}>Abbrechen</button>
                        </>
                    )}
                    <button className="btn btn-error" onClick={() => del.mutate(p.id)}>Löschen</button>
                </div>
            </div>
        </div>
    );
}
