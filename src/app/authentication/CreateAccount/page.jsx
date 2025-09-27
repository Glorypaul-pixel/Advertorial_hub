"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/CreateAccount.css";

const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const validateForm = () => {
    if (!email || !firstName || !lastName || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
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

      // ✅ COMMENTING OUT EMAIL VERIFICATION MESSAGE
      // setSuccess(
      //   "Account successfully created! Please check your email or spam for verification."
      // );

      // ✅ Instead, show success and send user straight to login
      setSuccess("Account successfully created! Redirecting to login...");

      setTimeout(() => {
        router.push("/authentication/Login");
      }, 1500);

    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
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
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a19.48 19.48 0 014.133-5.111m3.746-2.431A9.953 9.953 0 0112 5c7 0 10 7 10 7a19.476 19.476 0 01-4.134 5.111M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 100-8 4 4 0 000 8z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="input-group">
              <label htmlFor="confirm_password" className="label">
                Confirm Password
              </label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirm_password"
                  className="password-input"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-10-7-10-7a19.48 19.48 0 014.133-5.111m3.746-2.431A9.953 9.953 0 0112 5c7 0 10 7 10 7a19.476 19.476 0 01-4.134 5.111M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4.5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 100-8 4 4 0 000 8z"
                      />
                    </svg>
                  )}
                </button>
              </div>
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
                <Link href="/terms">
                  <b>Terms</b>
                </Link>{" "}
                and{" "}
                <Link href="/policy">
                  <b className="privacy-link">Privacy</b>
                </Link>
              </p>
            </div>
          </section>

         

          {error && <p className="error-text">{error}</p>}
          {success && (
            <p className="text-green-500 font-medium mt-2">{success}</p>
          )}

          <button
            type="submit"
            className="create-account-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateAccount;
