"use client";

import React, { useState } from "react";
import Link from "next/link";
import "@/styles/CreateAccount.css";
import "@/styles/AdvertWork.css";
import { icons } from "@/lib/Icons";

const steps = [
  "Create an account",
  "Upload Content",
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
          <h1 data-aos="zoom-in">How Advertorial Works</h1>
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
              <div
                className="stepText stepsDiv stepAcoount"
                data-aos="zoom-out"
              >
                <img
                  src="/images/createyouraccount.png"
                  alt="createaccount"
                  className="stepsImgAccount"
                />
              </div>
            </div>

            {/* Slide 2 */}
            <div className="slide">
              <div className="stepText stepsDiv">
                <img
                  src="/images/chart.png"
                  alt="chart"
                  className="stepsImg"
                  data-aos="zoom-out"
                />
              </div>
            </div>

            {/* Slide 3 */}
            <div className="slide">
              <div className="stepText stepsDiv">
                <img
                  src="/images/HomeAnaly.png"
                  alt="home"
                  className="stepsImg"
                  data-aos="zoom-out"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Pricepage-container">
        <main className="PriceMainContent">
          <section className="PriceHeadSection">
            <h1 className="Pricemain-heading" data-aos="zoom-in">
              We’ve got a plan that’s <br /> perfect for you
            </h1>

            <div className="billing-buttons" data-aos="zoom-out">
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

          <section className="Adpricing-section">
            {/* Personal Plan */}
            <div className="Adpricing-card">
              <section className="Priceplan-details" data-aos="zoom-in">
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
            <div className="Adpricing-card business-plan">
              <section className="Priceplan-details" data-aos="zoom-out">
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
            <div className="Adpricing-card">
              <section className="Priceplan-details" data-aos="zoom-in">
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
