import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import "../App.css";
import Checkout from './CheckoutPage.jsx';

const Cart = ({ lists, removeFromCart, createNewList }) => {
    const [newListName, setNewListName] = useState('');
    const [selectedList, setSelectedList] = useState(null);

    // Sortierung: "Default" immer zuerst, der Rest alphabetisch
    const orderedLists = useMemo(() => {
        return [...lists].sort((a, b) => {
            if (a.name === 'Default') return -1;
            if (b.name === 'Default') return 1;
            return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' });
        });
    }, [lists]);

    const handleCreateList = () => {
        const name = newListName.trim();
        if (!name) {
            alert("List name cannot be empty.");
            return;
        }
        if (lists.some((l) => l.name.toLowerCase() === name.toLowerCase())) {
            alert("A list with this name already exists.");
            return;
        }
        createNewList(name);
        setNewListName('');
    };

    // Wenn eine Liste ausgewählt ist → Checkout-Seite anzeigen
    if (selectedList) {
        return (
            <Checkout
                selectedList={selectedList}
                onBackToCart={() => setSelectedList(null)}
                onConfirmPayment={() => alert('Payment confirmed!')}
            />
        );
    }

    return (
        <div className="cart-container">
            <h2>Your Cart</h2>

            <div className="list-grid">
                {/* Alle Listen-Karten (mit Default vorneweg) */}
                {orderedLists.map((list) => {
                    const total = list.items.reduce((t, item) => t + item.price * item.quantity, 0);
                    return (
                        <div
                            key={list.name}
                            className="list-card"
                            role="button"
                            tabIndex={0}
                            onClick={() => setSelectedList(list)}
                            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setSelectedList(list)}
                            aria-label={`Open list ${list.name}`}
                        >
                            <h3>{list.name}</h3>
                            <h4>Total: ${total.toFixed(2)}</h4>
                            <p>{list.items.length} item(s)</p>
                        </div>
                    );
                })}

                {/* Create-Tile – wird im Grid immer als letzte Zelle eingefügt
            (durch die Reihenfolge im DOM). Mit CSS grid-auto-flow:dense
            rutscht es automatisch in die erste freie Zelle; sobald eine
            neue Liste erstellt wurde, nimmt diese den Platz ein und das
            Create-Tile wandert weiter. */}
                <div className="list-card new-list-card" aria-label="Create a new list">
                    <h3>Create New List</h3>
                    <input
                        type="text"
                        placeholder="New List Name"
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="form-control"
                    />
                    <button className="btn btn-primary mt-2" onClick={handleCreateList}>
                        Add List
                    </button>
                </div>
            </div>
        </div>
    );
};

Cart.propTypes = {
    lists: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired,
                    price: PropTypes.number.isRequired,
                    quantity: PropTypes.number.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    removeFromCart: PropTypes.func.isRequired,
    createNewList: PropTypes.func.isRequired,
};

export default Cart;
