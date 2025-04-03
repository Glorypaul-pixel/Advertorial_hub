"use client";
import { icons } from "@/lib/Icons";
import "../../styles/CreateAccount.css";
import Header from "../../components/Header";

const page = () => {
  return (
    <div className="">
      <Header />
      <div className="page-container">
        {/* Background Test */}
        <span className="background-pattern">
          <div className="gradient-overlay"></div>
        </span>
        {/* Container */}
        <section className="form-container">
          {/* Head Section */}
          <div className="head-section">
            <h1 className="title">Create your account</h1>
            <p className="subtitle">
              Quickly create your advertorial account or
              <b className="login-link"> Log In</b>
            </p>
          </div>

          {/* Form Section */}
          <form action="" className="form">
            {/* Auth by Email */}
            <section className="input-section">
              {/* Email */}
              <div className="input-group">
                <label htmlFor="name" className="label">
                  Email Address
                </label>
                <input type="email" id="name" className="input-field" />
              </div>

              {/* First Name */}
              <div className="input-group">
                <label htmlFor="first_name" className="label">
                  First Name
                </label>
                <input type="text" id="first_name" className="input-field" />
              </div>

              {/* Last Name */}
              <div className="input-group">
                <label htmlFor="last_name" className="label">
                  Last Name
                </label>
                <input type="text" id="last_name" className="input-field" />
              </div>

              {/* Password */}
              <div className="input-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                  <input type="password" id="password" className="password-field password-input" />
                
              </div>

              {/* Terms and Privacy */}
              <div className="terms-privacy">
                <input type="checkbox" id="terms" className="checkbox" />
                <p className="terms-text">
                  I accept the <b className="terms-link">Terms</b> and{" "}
                  <b className="privacy-link">Privacy</b>
                </p>
              </div>
            </section>

            {/* Auth by Other Means */}
            <section className="auth-other-means">
              {/* Button */}
              <button className="create-account-button">Create Account</button>

              {/* OR Divider */}
              <div className="or-divider">
                <span className="divider-line"></span>
                <span className="or-text">OR</span>
                <span className="divider-line"></span>
              </div>

              {/* Auth Buttons */}
              <div className="auth-buttons">
                <button className="auth-button">
                  <span>{icons.google}</span> Sign up with Google
                </button>
                <button className="auth-button">
                  <span>{icons.facebook}</span> Sign up with Facebook
                </button>
              </div>
            </section>
          </form>
        </section>
      </div>
    </div>
  );
};

export default page;
