// App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import Drinks from './components/Drinks';
import Cart from './components/Cart';
import Gallery from './components/Gallery';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import Impressum from './components/Impressum';
import Datenschutz from './components/Datenschutz';
import AGB from './components/AGB';
import Widerruf from './components/Widerruf';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './components/AuthContext';
import AuthPage from './components/AuthPage';
import Account from './components/Account';

const App = () => {
    const drinksList = [
        // ... deine bestehenden Produkte unverändert ...
        {
            id: 1,
            name: 'Limeli Original',
            price: 12.99,
            description: 'Eine ausgewogene Mischung ...',
            image: '../assets/limeli-original.png',
            details: {
                articleNumber: '100101',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Alpen',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Alpenkräutertee, Honig, Apfelessig, Traubensaft',
            },
        },
        {
            id: 2,
            name: 'Limeli Winter Edition',
            price: 14.99,
            description: 'Eine wärmende Mischung aus Gewürzen wie Zimt, Nelken und Ingwer – ideal für kalte Tage.',
            image: '../assets/limeli-winter.png',
            details: {
                articleNumber: '100102',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Alpen',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Zimt, Nelken, Ingwer, Alpenkräutertee, Honig, Apfelessig, Traubensaft',
            },
        },
        {
            id: 3,
            name: 'Limeli Deluxe',
            price: 16.99,
            description: 'Eine luxuriöse Edition mit intensiverem Geschmack, verfeinert mit Vanille und Bergkräutern.',
            image: '../assets/limeli-deluxe.png',
            details: {
                articleNumber: '100103',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Alpen',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Vanille, Bergkräuter, Alpenkräutertee, Honig, Apfelessig, Traubensaft',
            },
        },
        {
            id: 4,
            name: 'Limeli Grove',
            price: 15.99,
            description: 'Ein erfrischender Mix aus grünem Tee, Zitrusfrüchten und Minze – perfekt für warme Tage.',
            image: '../assets/limeli-grove.png',
            details: {
                articleNumber: '100104',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Alpen',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Grüner Tee, Zitrusfrüchte, Minze, Apfelessig, Traubensaft',
            },
        },
        {
            id: 5,
            name: 'Limeli Summer Breeze',
            price: 13.99,
            description: 'Ein tropischer Genuss mit Mango, Kokoswasser und einem Hauch von Limette.',
            image: '../assets/limeli-summer.png',
            details: {
                articleNumber: '100105',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Tropenfusion',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Mango, Kokoswasser, Limette, Apfelessig, Traubensaft',
            },
        },
        {
            id: 6,
            name: 'Limeli Midnight Glow',
            price: 17.99,
            description: 'Eine mystische Mischung aus schwarzen Johannisbeeren, Brombeeren und einem Hauch von Lavendel.',
            image: '../assets/limeli-midnight.png',
            details: {
                articleNumber: '100106',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Alpine Nächte',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Schwarze Johannisbeeren, Brombeeren, Lavendel, Apfelessig, Traubensaft',
            },
        },
        {
            id: 7,
            name: 'Limeli Citrus Glow',
            price: 15.49,
            description: 'Eine spritzige Fusion aus Blutorange, Mandarine und einer Note von Ingwer.',
            image: '../assets/limeli-citrus.png',
            details: {
                articleNumber: '100107',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Mediterraner Hauch',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Blutorange, Mandarine, Ingwer, Apfelessig, Traubensaft',
            },
        },
        {
            id: 8,
            name: 'Limeli Herbal Bliss',
            price: 16.49,
            description: 'Eine wohltuende Kombination aus Kamille, Zitronenmelisse und einem Hauch von Honig.',
            image: '../assets/limeli-herbal.png',
            details: {
                articleNumber: '100108',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Kräuterwiesen',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Kamille, Zitronenmelisse, Honig, Apfelessig, Traubensaft',
            },
        },
        {
            id: 9,
            name: 'Limeli Arctic Chill',
            price: 14.99,
            description: 'Ein erfrischendes Erlebnis mit Minze, Eukalyptus und einem Hauch von Zitrone.',
            image: '../assets/limeli-arctic.png',
            details: {
                articleNumber: '100109',
                alcoholContent: '0%',
                bottleVolume: '50cl',
                country: 'Schweiz',
                region: 'Arktische Frische',
                bottler: 'Limeli AG',
                brand: 'Limeli',
                type: 'Erfrischungsgetränk',
                contents: 'Minze, Eukalyptus, Zitrone, Apfelessig, Traubensaft',
            },
        },
    ];

    const [lists, setLists] = useState([{ name: 'Default', items: [] }]);

    const addToCart = (drink, quantity, listName = 'Default') => {
        setLists((prevLists) => {
            const list = prevLists.find((l) => l.name === listName);
            if (list) {
                const existingItem = list.items.find((item) => item.id === drink.id);
                if (existingItem) {
                    return prevLists.map((l) =>
                        l.name === listName
                            ? {
                                ...l,
                                items: l.items.map((item) =>
                                    item.id === drink.id
                                        ? { ...item, quantity: item.quantity + quantity }
                                        : item
                                ),
                            }
                            : l
                    );
                } else {
                    return prevLists.map((l) =>
                        l.name === listName
                            ? { ...l, items: [...l.items, { ...drink, quantity }] }
                            : l
                    );
                }
            } else {
                return [...prevLists, { name: listName, items: [{ ...drink, quantity }] }];
            }
        });
    };

    const createNewList = (listName) => {
        if (!listName.trim()) return;
        setLists((prevLists) => [...prevLists, { name: listName.trim(), items: [] }]);
    };

    const removeFromCart = (drinkId, listName, quantity) => {
        setLists((prevLists) =>
            prevLists.map((list) =>
                list.name === listName
                    ? {
                        ...list,
                        items: list.items
                            .map((item) =>
                                item.id === drinkId
                                    ? { ...item, quantity: item.quantity - quantity }
                                    : item
                            )
                            .filter((item) => item.quantity > 0),
                    }
                    : list
            )
        );
    };

    const imageUrls = drinksList.map((drink) => drink.image);

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home drinks={drinksList} />} />
                        <Route
                            path="/product/:id"
                            element={
                                <ProductDetails
                                    drinks={drinksList}
                                    addToCart={addToCart}
                                    lists={lists}
                                    createNewList={createNewList}
                                />
                            }
                        />
                        <Route path="/drinks" element={<Drinks drinks={drinksList} addToCart={addToCart} />} />
                        <Route
                            path="/cart"
                            element={
                                <Cart
                                    lists={lists}
                                    removeFromCart={removeFromCart}
                                    createNewList={createNewList}
                                />
                            }
                        />
                        <Route path="/gallery" element={<Gallery images={imageUrls} />} />
                        <Route path="/aboutUs" element={<AboutUs />} />

                        {/* Legal */}
                        <Route path="/legal/impressum" element={<Impressum />} />
                        <Route path="/legal/datenschutz" element={<Datenschutz />} />
                        <Route path="/legal/agb" element={<AGB />} />
                        <Route path="/legal/widerruf" element={<Widerruf />} />

                        {/* Auth */}
                        <Route path="/auth" element={<AuthPage />} />
                        <Route path="/account" element={<Account />} />
                    </Routes>
                </div>
                <Footer />
            </Router>
        </AuthProvider>
    );
};

export default App;
