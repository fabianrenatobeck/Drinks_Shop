// Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useAuth } from "./AuthContext";

function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
    const goAccount = () => navigate(isAuthenticated ? "/account" : "/auth");

    return (
        <nav className="navbar-outer">
            <div className="navbar-inner">
                <h1>Drink Shop</h1>

                <button className="navbar-toggler" onClick={toggleMobileMenu} aria-label="Toggle navigation">
                    ☰
                </button>

                {/* Desktop */}
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Drinks">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/Gallery">Gallery</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                </ul>

                {/* Avatar rechts */}
                <button className="nav-avatar-btn" onClick={goAccount} aria-label="Account">
                    <div className="avatar">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt={user.displayName || "User"} />
                        ) : (
                            <span className="avatar-initial">{(user?.displayName || "U")[0].toUpperCase()}</span>
                        )}
                    </div>
                </button>

                {/* Mobile */}
                <ul className={`nav-links-mobile ${isMobileMenuOpen ? "show" : ""}`}>
                    <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/Drinks" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
                    <li><Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link></li>
                    <li><Link to="/Gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link></li>
                    <li><Link to="/AboutUs" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
                    <li>
                        <button className="nav-avatar-btn mobile" onClick={() => { setMobileMenuOpen(false); goAccount(); }}>
                            <div className="avatar">
                                {user?.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName || "User"} />
                                ) : (
                                    <span className="avatar-initial">{(user?.displayName || "U")[0].toUpperCase()}</span>
                                )}
                            </div>
                            <span className="mobile-label">{isAuthenticated ? "Mein Konto" : "Anmelden"}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
