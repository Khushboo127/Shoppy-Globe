// Footer component
import React from 'react'
import '../styles/footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2025 ShoppyGlobe. All rights reserved.</p>
                <div className="footer-links">
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                    <a href="#privacy">Privacy Policy</a>
                </div>
            </div>
        </footer>
    )
}
