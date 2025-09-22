import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar() {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

    return (
        <nav className="navbar-outer">
            {/* Inner – begrenzte Breite für den Content */}
            <div className="navbar-inner">
                <h1>Drink Shop</h1>

                {/* Burger */}
                <button className="navbar-toggler" onClick={toggleMobileMenu} aria-label="Toggle navigation">
                    ☰
                </button>

                {/* Desktop Navigation */}
                <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Drinks">Products</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <li><Link to="/Gallery">Gallery</Link></li>
                    <li><Link to="/AboutUs">About Us</Link></li>
                </ul>

                {/* Mobile Navigation */}
                <ul className={`nav-links-mobile ${isMobileMenuOpen ? "show" : ""}`}>
                    <li><Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link></li>
                    <li><Link to="/Drinks" onClick={() => setMobileMenuOpen(false)}>Products</Link></li>
                    <li><Link to="/cart" onClick={() => setMobileMenuOpen(false)}>Cart</Link></li>
                    <li><Link to="/Gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link></li>
                    <li><Link to="/AboutUs" onClick={() => setMobileMenuOpen(false)}>About Us</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
