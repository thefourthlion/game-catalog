import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import Link from "next/link";
import Input from "../components/Input";

const Register = () => {
  const { logOut, user } = useUserAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();

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
    if (password == retypePassword) {
      try {
        await signUp(email, password);
        navigate("/");
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Passwords Do Not Match");
    }
  };

  return (
    <div className="Register page">
      <h2>Register </h2>
      {error && <Alert variant="danger">{error}</Alert>}

      <form onSubmit={handleSubmit}>
        <Input
          placeholder="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          placeholder="retype password"
          type="password"
          onChange={(e) => setRetypePassword(e.target.value)}
        />

        <h4>
          Already have an account? <Link href="/login">Login</Link>
        </h4>

        <button className="primary-btn" type="submit">
          Register
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

export default Register;
