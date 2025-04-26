"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/CreateAccount.css";
import "../styles/AdvertWork.css";
import { icons } from "@/lib/Icons";

const steps = [
  "Create an account",
  "Upload Content",
  "Share with People",
  "Monitor inflow of traffic",
];

const AdvertWork = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleStepChange = (index) => {
    setActiveStep(index);
  };
  const [billing, setBilling] = useState("monthly");

  const prices = {
    personal: "Free",
    business: billing === "monthly" ? "$400" : "$4,000",
    team: billing === "monthly" ? "$700" : "$7,000",
  };
  return (
    <div id="AdvertWork">
      <div className="Advertwork">
        <div className="worksHead">
          <h1>How Advertorial Works</h1>
          <div className="worksSlot">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`step ${activeStep === index ? "active" : ""}`}
                onClick={() => handleStepChange(index)}
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        <div className="slider-wrapper">
          <div
            className="slider-container"
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {/* Slide 1 */}
            <div className="slide">
              <div className="Advertpagecontainer">
                <section className="form-container">
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
                  <form className="form advertForm">
                    <section className="input-section">
                      <div className="input-group">
                        <label htmlFor="email" className="label">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          className="input-field"
                        />
                      </div>
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
                      <div className="input-group">
                        <label htmlFor="last_name" className="label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="input-field"
                        />
                      </div>
                      <div className="input-group">
                        <label htmlFor="password" className="label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="password-field"
                        />
                      </div>
                      <div className="terms-privacy">
                        <input
                          type="checkbox"
                          id="terms"
                          className="checkbox"
                        />
                        <p className="terms-text">
                          I accept the{" "}
                          <Link href="/auth/Terms">
                            <b className="terms-link">Terms</b>
                          </Link>{" "}
                          and{" "}
                          <Link href="/auth/Policy">
                            <b className="privacy-link">Privacy</b>
                          </Link>
                        </p>
                      </div>
                    </section>
                    <section className="auth-other-means">
                      <button className="create-account-button">
                        Create Account
                      </button>
                      <div className="or-divider">
                        <span className="divider-line"></span>
                        <span className="or-text">OR</span>
                        <span className="divider-line"></span>
                      </div>
                      <div className="auth-buttons">
                        <button className="auth-button">
                          Sign up with Google
                        </button>
                        <button className="auth-button">
                          Sign up with Facebook
                        </button>
                      </div>
                    </section>
                  </form>
                </section>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <h2 className="stepTitle">Upload your content</h2>
              <p className="stepText">
                Add content, images or videos to your new account.
              </p>
            </div>

            {/* Slide 3 */}
            <div className="slide">
              <h2 className="stepTitle">Share with people</h2>
              <p className="stepText">
                Promote your content with a unique link and track your reach.
              </p>
            </div>

            {/* Slide 4 */}
            <div className="slide">
              <h2 className="stepTitle">Monitor inflow</h2>
              <p className="stepText">
                Get insights into who’s interacting with your content.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="Pricepage-container">
        <main className="PriceMainContent">
          <section className="PriceHeadSection">
            <h1 className="Pricemain-heading">
              We’ve got a plan that’s <br /> perfect for you
            </h1>

            <div className="billing-buttons">
              <button
                className={`monthly-billing ${
                  billing === "monthly" ? "active" : ""
                }`}
                onClick={() => setBilling("monthly")}
              >
                Monthly Billing
              </button>
              <button
                className={`annual-billing ${
                  billing === "annual" ? "active" : ""
                }`}
                onClick={() => setBilling("annual")}
              >
                Annual Billing
              </button>
            </div>
          </section>

          <section className="pricing-section">
            {/* Personal Plan */}
            <div className="pricing-card">
              <section className="Priceplan-details">
                <div className="Priceplan-header">
                  <h2 className="Priceplan-title">
                    Personal Plan
                    <span className="Priceplan-subtitle">
                      Perfect plan for starters
                    </span>
                  </h2>
                  <h1 className="plan-price">
                    {prices.personal}
                    <span className="Priceplan-subtitle">For a Lifetime</span>
                  </h1>
                </div>
                <button className="current-plan-btn">Current Plan</button>
              </section>
              <section className="Priceplan-features">
                {[...Array(5)].map((_, i) => (
                  <p className="Pricefeature" key={i}>
                    <span>{icons.greencheck}</span> Unlimited Post
                  </p>
                ))}
              </section>
            </div>

            {/* Business Plan */}
            <div className="pricing-card business-plan">
              <section className="Priceplan-details">
                <div className="Priceplan-header">
                  <h2 className="Priceplan-titlelight">
                    Business Plan
                    <br />
                    <span className="plan-subtitlelight">
                      For users who want to do more
                    </span>
                  </h2>
                  <h1 className="plan-pricelight">
                    {prices.business}
                    <span className="plan-subtitlelight">
                      {billing === "monthly" ? "per month" : "per year"}
                    </span>
                  </h1>
                </div>
                <button className="get-started-btn">Get Started</button>
              </section>
              <section className="Priceplan-features">
                {[...Array(5)].map((_, i) => (
                  <p className="Pricefeaturelight" key={i}>
                    <span>{icons.whitecheck}</span> Unlimited Post
                  </p>
                ))}
              </section>
            </div>

            {/* Team Plan */}
            <div className="pricing-card">
              <section className="Priceplan-details">
                <div className="Priceplan-header">
                  <h2 className="Priceplan-title">
                    Team Plan
                    <span className="Priceplan-subtitle">
                      Run your company on your terms
                    </span>
                  </h2>
                  <h1 className="plan-price">
                    {prices.team}
                    <span className="Priceplan-subtitle">
                      {billing === "monthly" ? "per month" : "per year"}
                    </span>
                  </h1>
                </div>
                <button className="current-plan-btn">Get Started</button>
              </section>
              <section className="Priceplan-features">
                {[...Array(5)].map((_, i) => (
                  <p className="Pricefeature" key={i}>
                    <span>{icons.greencheck}</span> Unlimited Post
                  </p>
                ))}
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdvertWork;
