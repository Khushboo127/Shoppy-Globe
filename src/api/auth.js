import api from "./client";

// POST /api/auth/register
export const registerUser = (username, email, password) =>
    api.post("/auth/register", { username, email, password });

// POST /api/auth/login
export const loginUser = (email, password) =>
    api.post("/auth/login", { email, password });
