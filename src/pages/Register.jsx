// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/client";           // axios instance (same as login)
import "../styles/Login.css";             // reuse login / auth styles

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            await api.post("/auth/register", form);
            setMessage("Registration successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 1500);
        } catch (err) {
            const msg =
                err.response?.data?.message || "Registration failed, please try again.";
            setMessage(msg);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h1 className="login-title">Create Account</h1>
                <p className="login-subtitle">
                    Join ShoppyGlobe to start shopping.
                </p>

                <form className="login-form" onSubmit={handleSubmit}>
                    {/* Username */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="username">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            className="login-input"
                            placeholder="Enter your name"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            className="login-input"
                            placeholder="you@example.com"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Password with show/hide */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            Password
                        </label>

                        <div className="password-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="login-input password-input"
                                placeholder="Create a password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button">
                        Sign Up
                    </button>

                    {message && <p className="login-message">{message}</p>}
                </form>

                <p className="login-footer-text">
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
