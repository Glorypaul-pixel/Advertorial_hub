"use client";

import React, { useState } from "react";
import { icons } from "@/lib/Icons";
import "@/styles/CreateAccount.css";
import Link from "next/link";
import "../styles/AdvertWork.css";
const AdvertWork = () => {
  const [activeStep, setActiveStep] = useState("Create an account");
  return (
    <div>
      <div className="Advertwork">
        <div className="worksHead">
          <h1>How Advertorial Works</h1>
          <div className="worksSlot">
            <div
              className={`step ${
                activeStep === "Create an account" ? "active" : ""
              }`}
              onMouseEnter={() => setActiveStep("Create an account")}
            >
              Create an account
            </div>
            <div
              className={`step ${
                activeStep === "Upload Content" ? "active" : ""
              }`}
              onMouseEnter={() => setActiveStep("Upload Content")}
            >
              Upload Content
            </div>
            <div
              className={`step ${
                activeStep === "Share with People" ? "active" : ""
              }`}
              onMouseEnter={() => setActiveStep("Share with People")}
            >
              Share with People
            </div>
            <div
              className={`step ${
                activeStep === "Monitor inflow of traffic" ? "active" : ""
              }`}
              onMouseEnter={() => setActiveStep("Monitor inflow of traffic")}
            >
              Monitor inflow of traffic
            </div>
          </div>
        </div>
        <div className="advertSignUp">
          <div className="Advertpagecontainer">
            {/* Background Test */}
            <span className="background-pattern">
              <div className="gradient-overlay"></div>
            </span>
            {/* Container */}
            <section className="form-container">
              {/* Head Section */}
              <div className="head-section">
                <h1 className="title Createtitle">Create your account</h1>
                <p className="subtitle createSubtitle">
                  Quickly create your advertorial account or
                  <Link href="/auth/Login">
                    {" "}
                    <b className="login-link"> Log In</b>
                  </Link>
                </p>
              </div>

              {/* Form Section */}
              <form action="" className="form advertForm">
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
                    <input
                      type="text"
                      id="first_name"
                      className="input-field"
                    />
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

                    <input
                      type="password"
                      id="password"
                      className="password-field password-input"
                    />
                  </div>

                  {/* Terms and Privacy */}
                  <div className="terms-privacy">
                    <input type="checkbox" id="terms" className="checkbox" />
                    <p className="terms-text">
                      I accept the{" "}
                      <b className="terms-link">
                        <Link href="/auth/Terms">Terms</Link>
                      </b>{" "}
                      and{" "}
                      <Link href="/auth/Policy">
                        <b className="privacy-link">Privacy</b>
                      </Link>
                    </p>
                  </div>
                </section>

                {/* Auth by Other Means */}
                <section className="auth-other-means">
                  {/* Button */}
                  <button className="create-account-button">
                    Create Account
                  </button>

                  {/* OR Divider */}
                  <div className="or-divider">
                    <span className="divider-line"></span>
                    <span className="or-text">OR</span>
                    <span className="divider-line"></span>
                  </div>

                  {/* Auth Buttons */}
                  <div className="auth-buttons">
                    <button className="auth-button">Sign up with Google</button>
                    <button className="auth-button">
                      Sign up with Facebook
                    </button>
                  </div>
                </section>
              </form>
            </section>
          </div>
        </div>
      </div>
      <div className=" Pricepage-container">
        {/* container  */}
        

          <div className=" Pricepage-container">
            <main className="  PriceMainContent">
              {/* head section  */}
              <section className="PriceHeadSection  ">
                <h1 className=" Pricemain-heading">
                  We’ve got a plan that’s <br /> perfect for you
                </h1>
                {/* buttons  */}
                <div className="billing-buttons ">
                  <button className="monthly-billing ">Monthly Billing</button>
                  <button className="annual-billing">Annual Billing</button>
                </div>
              </section>

              {/* pricing section  */}
              <section className=" pricing-section ">
                {/* personal plan  */}
                <div className=" pricing-card  ">
                  {/* top section  */}
                  <section className=" Priceplan-details">
                    <div className=" Priceplan-header">
                      <h2 className="Priceplan-title">
                        {" "}
                        Personal Plan{" "}
                        <span className=" Priceplan-subtitle ">
                          Perfect plan for starters
                        </span>
                      </h2>
                      <h1 className=" plan-price ">
                        {" "}
                        Free
                        <span className=" Priceplan-subtitle ">
                          For a Lifetime
                        </span>
                      </h1>
                    </div>
                    <button className="current-plan-btn">Current Plan</button>
                  </section>
                  {/* bottom section  */}
                  <section className="Priceplan-features">
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                  </section>
                </div>
                {/* business plan  */}
                <div className="pricing-card business-plan">
                  {/* top section  */}
                  <section className=" Priceplan-details ">
                    <div className=" Priceplan-header">
                      <h2 className="Priceplan-titlelight">
                        {" "}
                        Business Plan
                        <br />
                        <span className="  plan-subtitlelight">
                          For users who wants to do more
                        </span>
                      </h2>
                      <h1 className="plan-pricelight">
                        {" "}
                        $400
                        <span className="plan-subtitlelight">per month</span>
                      </h1>
                    </div>
                    <button className="get-started-btn">Get Started</button>
                  </section>
                  {/* bottom section  */}
                  <section className="Priceplan-features">
                    <p className=" Pricefeaturelight ">
                      <span>{icons.whitecheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeaturelight ">
                      <span>{icons.whitecheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeaturelight ">
                      <span>{icons.whitecheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeaturelight ">
                      <span>{icons.whitecheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeaturelight ">
                      <span>{icons.whitecheck}</span> Unlimited Post
                    </p>
                  </section>
                </div>
                {/* team plan  */}
                <div className="pricing-card ">
                  {/* top section  */}
                  <section className=" Priceplan-details">
                    <div className=" Priceplan-header">
                      <h2 className="  Priceplan-title">
                        {" "}
                        Team Plan{" "}
                        <span className="Priceplan-subtitle ">
                          Run your company on your terms
                        </span>
                      </h2>
                      <h1 className=" plan-price">
                        {" "}
                        $700
                        <span className=" Priceplan-subtitle ">per month</span>
                      </h1>
                    </div>
                    <button className="current-plan-btn">Get Started</button>
                  </section>
                  {/* bottom section  */}
                  <section className="Priceplan-features">
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                    <p className=" Pricefeature">
                      <span>{icons.greencheck}</span> Unlimited Post
                    </p>
                  </section>
                </div>
              </section>
            </main>
         </div>
      </div>
    </div>
  );
};

export default AdvertWork;
