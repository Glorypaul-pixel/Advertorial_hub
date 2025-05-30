"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ Correct for App Router
import { icons } from "@/lib/Icons";
import "@/styles/Login.css";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter(); // ✅ Works with App Router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://advertorial-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed!");
      }

      // Save token, user ID, and email in localStorage
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("token", data.token);

      // console.log("Login Successful:", data);
      // alert("Login successful!");

      // ✅ Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Loginpage-container">
      <span className="background-pattern">
        <div className="gradient-overlay"></div>
      </span>

      <section className="form-container">
        <div className="head-section">
          <h1 className="title">Log In</h1>
          <div className="subtitle">
            Log in to your advertorial account or
            <Link href="/authentication/CreateAccount">
              <strong className="create-account"> Create Account</strong>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <section className="input-section">
            <div className="input-group">
              <label htmlFor="email" className="label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </section>

          {error && <p className="error-text">{error}</p>}

          <section className="auth-other-means">
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="or-divider">
              <span className="divider-line"></span>
              <span className="or-text">OR</span>
              <span className="divider-line"></span>
            </div>

            <div className="auth-buttons">
              <button type="button" className="auth-button">
                <span>{icons?.google || "🔵"}</span> Sign up with Google
              </button>
              <button type="button" className="auth-button">
                <span>{icons?.facebook || "🔵"}</span> Sign up with Facebook
              </button>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
};

export default Login;
