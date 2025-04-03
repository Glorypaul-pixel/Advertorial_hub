"use client";
import { icons } from "@/lib/Icons"; // Ensure this file exists
import "../../styles/Login.css";
import Link from "next/link";
import Header from "../../components/Header";

const Login = () => {
  return (
    <div className="">
      <Header />
      <div className="page-container">
        {/* Background Pattern */}
        <span className="background-pattern">
          <div className="gradient-overlay"></div>
        </span>

        {/* Container */}
        <section className="form-container">
          {/* Head Section */}
          <div className="head-section">
            <h1 className="title">Log In</h1>
            <div className="subtitle">
              Log In to your advertorial account or
              <Link href="/auth/CreateAccount">
                <strong className="create-account"> Create Account</strong>
              </Link>
            </div>
          </div>

          {/* Form Section */}
          <form action="" className="form">
            {/* Auth by Email */}
            <section className="input-section">
              {/* Email */}
              <div className="input-group">
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input type="email" id="email" className="input-field" />
              </div>

              {/* Password */}
              <div className="input-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input type="password" id="password" className="input-field" />
              </div>
            </section>

            {/* Auth by Other Means */}
            <section className="auth-other-means">
              {/* Login Button */}
              <button className="login-button">Log In</button>

              {/* OR Divider */}
              <div className="or-divider">
                <span className="divider-line"></span>
                <span className="or-text">OR</span>
                <span className="divider-line"></span>
              </div>

              {/* Auth Buttons */}
              <div className="auth-buttons">
                <button className="auth-button">
                  <span>{icons?.google || "🔵"}</span> Sign up with Google
                </button>
                <button className="auth-button">
                  <span>{icons?.facebook || "🔵"}</span> Sign up with Facebook
                </button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Login;
