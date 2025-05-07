"use client";
import { useState } from "react";
import { icons } from "@/lib/Icons";
import "@/styles/Pricing.css";

const Pricing = () => {
  const [billing, setBilling] = useState("monthly");

  const prices = {
    personal: "Free",
    business: billing === "monthly" ? "$400" : "$4,000",
    team: billing === "monthly" ? "$700" : "$7,000",
  };

  return (
    <div>
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
      <footer className="dashFooter">
        <p>&copy; 2025 Advertorial Hub. All Rights Reserved.</p>
        <a href="/Policy">Privacy Policy</a> | <a href="/AboutUs">About Us</a>
      </footer>
    </div>
  );
};

export default Pricing;
