import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Input from "../components/Input";
import { Navigate } from "react-router-dom";
const Login = () => {
    const { logOut, user } = useUserAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            return <Navigate to="/" />;
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            return <Navigate to="/" />;
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="Login page">
            <h2>Log In</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <form onSubmit={handleSubmit}>
                <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <h4>
                    Don't have an account? <a href="/register">Register</a>
                </h4>

                <button className="primary-btn" type="submit">
                    Log In
                </button>
            </form>

            {user && (
                <button className="secondary-btn logout-btn" onClick={handleLogout}>
                    Log Out
                </button>
            )}
        </div>
    );
};

export default Login;
