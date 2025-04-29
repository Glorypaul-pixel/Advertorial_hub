"use client";

import { useState } from "react";
import Link from "next/link";
import { icons } from "@/lib/Icons"; // Ensure this file exists
import "@/styles/CreateAccount.css"; // Make sure the CSS is correctly located

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email || !firstName || !lastName || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    if (!termsAccepted) {
      setError("You must accept the Terms and Privacy.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(
        "https://advertorial-backend.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            firstName,
            lastName,
            password,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Account creation failed!");
      }

      const data = await response.json();
      console.log("Registration Successful:", data);
      // Optionally redirect to login or verification page here
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Create-container">
      <span className="background-pattern">
        <div className="gradient-overlay"></div>
      </span>

      <section className="Create-form-container">
        <div className="head-section">
          <h1 className="title">Create your account</h1>
          <p className="subtitle">
            Quickly create your advertorial account or
            <b className="login-link"> Log In</b>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <section className="input-section">
            {/* Email */}
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

            {/* First Name */}
            <div className="input-group">
              <label htmlFor="first_name" className="label">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                className="input-field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* Last Name */}
            <div className="input-group">
              <label htmlFor="last_name" className="label">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                className="input-field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="input-group">
              <label htmlFor="password" className="label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="password-field password-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Terms */}
            <div className="terms-privacy">
              <input
                type="checkbox"
                id="terms"
                className="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <p className="terms-text">
                I accept the{" "}
                <Link href="/auth/Terms">
                  <b>Terms</b>
                </Link>{" "}
                and{" "}
                <Link href="/auth/Policy">
                  <b className="privacy-link">Privacy</b>
                </Link>
              </p>
            </div>
          </section>

          {error && <p className="error-text">{error}</p>}

          <section className="auth-other-means">
            <button
              type="submit"
              className="create-account-button"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="or-divider">
              <span className="divider-line"></span>
              <span className="or-text">OR</span>
              <span className="divider-line"></span>
            </div>

            <div className="auth-buttons">
              <button type="button" className="auth-button">
                <span>{icons.google}</span> Sign up with Google
              </button>
              <button type="button" className="auth-button">
                <span>{icons.facebook}</span> Sign up with Facebook
              </button>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
};

export default CreateAccount;
