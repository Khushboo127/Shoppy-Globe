// src/pages/Login.jsx
import { useState } from "react";
import { loginUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

function Login() {
    const [email, setEmail] = useState("khushboo@example.com");
    const [password, setPassword] = useState("Password123");
    const [showPassword, setShowPassword] = useState(false);
    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        setLoading(true);

        try {
            const res = await loginUser(email, password);
            const token = res.data.token;
            localStorage.setItem("token", token);
            setMsg("Login successful!");

            navigate("/");
        } catch (err) {
            console.error("LOGIN ERROR:", err);
            const backendMsg =
                err.response?.data?.message ||
                err.response?.data?.error ||
                err.message;
            setMsg(`Login failed: ${backendMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Login</h2>
                <p className="login-subtitle">
                    Use your ShoppyGlobe account to continue
                </p>

                <form onSubmit={handleSubmit} className="login-form">
                    {/* Email */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="login-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="login-field">
                        <label className="login-label" htmlFor="password">
                            Password
                        </label>

                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="login-input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />

                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="login-button" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {msg && <p className="login-message">{msg}</p>}
            </div>
        </div>
    );
}

export default Login;
