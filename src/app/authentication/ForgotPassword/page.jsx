"use client";
import React, { useState } from "react";
import "@/styles/forgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://advertorial-backend.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Password reset email sent successfully.");
        setSubmitted(true); // ✅ Switch UI after success
      } else {
        setMessage(data.message || "Something went wrong. Try again.");
      }
    } catch (error) {
      setMessage("Error connecting to server.");
    }
  };

  return (
    <div className="forgot-container">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="forgot-form">
          <h2>Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
          {message && <p className="error-text">{message}</p>}
        </form>
      ) : (
        <div className="success-box">
          <h2>✅ Check your email</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}
