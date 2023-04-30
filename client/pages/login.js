import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Link from "next/link";
import Input from "../components/Input";
const Login = () => {
  const { logOut, user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn } = useUserAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="Login page">
      <h2>Log In</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Input
            placeholder="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <h4>
          Don't have an account? <Link href="/register">Register</Link>
        </h4>

        <button className="primary-btn">Log In</button>
      </Form>

      {user && (
        <button className="secondary-btn logout-btn" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default Login;
