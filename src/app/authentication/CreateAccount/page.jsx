"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { icons } from "@/lib/Icons";
import { signIn } from "next-auth/react"; // Added for Google/Facebook signup
import "@/styles/CreateAccount.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

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
    setSuccess("");

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

      const responseBody = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error("An account with this email already exists.");
        }
        throw new Error(responseBody.message || "Account creation failed!");
      }

      setSuccess(
        "Account successfully created! Please check your email or spam for verification."
      );

      // Redirect to success/login page after short delay
      setTimeout(() => {
        router.push("/authentication/Success");
      }, 1500);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google signup
  const handleGoogleSignup = () => {
    signIn("google", { callbackUrl: "/authentication/Success" });
  };

  // Facebook signup
  const handleFacebookSignup = () => {
    signIn("facebook", { callbackUrl: "/authentication/Success" });
  };

  return (
    <div className="Create-container">
      <span className="background-pattern">
        <div className="gradient-overlay"></div>
      </span>

      <section className="Create-form-container">
        <div className="head-section" data-aos="fade-up">
          <h1 className="title">Create your account</h1>
          <p className="subtitle">
            Quickly create your advertorial account or{" "}
            <b
              className="login-link"
              onClick={() => router.push("/authentication/Login")}
            >
              Log In
            </b>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form" data-aos="flip-right">
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
                <Link href="/Terms">
                  <b>Terms</b>
                </Link>{" "}
                and{" "}
                <Link href="/Policy">
                  <b className="privacy-link">Privacy</b>
                </Link>
              </p>
            </div>
          </section>

          {error && <p className="error-text">{error}</p>}
          {success && (
            <p className="text-green-500 font-medium mt-2">{success}</p>
          )}

          {/* Other signup methods */}
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
              <button
                type="button"
                className="auth-button"
                onClick={handleGoogleSignup}
              >
                <span>{icons.google}</span> Sign up with Google
              </button>

              <button
                type="button"
                className="auth-button"
                onClick={handleFacebookSignup}
              >
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
