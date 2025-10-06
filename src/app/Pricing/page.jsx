"use client";
import { useState, useEffect } from "react";
import { icons } from "@/lib/Icons";
import "@/styles/AdvertWork.css";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AdPricing() {
  const [billing, setBilling] = useState("monthly");
  const [user, setUser] = useState({ email: "", plan: "PERSONAL" });
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const userIdOrEmail = localStorage.getItem("userId");
      setToken(localStorage.getItem("token"));

      if (!userIdOrEmail) return;

      try {
        const res = await fetch(
          `https://advertorial-backend.onrender.com/api/auth/user/${userIdOrEmail}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const userData = await res.json();
        setUser(userData);
        console.log("USER DATA", userData);
        console.log(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    getUser();
  }, []);

  //  Start payment flow (redirect to backend)
  const handleBackendPayment = (planName) => {
    if (!user?.email) {
      router.push("/authentication/Login");
      return;
    }

    // Prevent jumping directly to Team from Personal
    if (user.plan === "PERSONAL" && planName === "TEAM") {
      toast.error("Please upgrade to Business first.");
      return;
    }

    try {
      const backendUrl = `https://connect.advertorialhub.net/?plan=${planName}&billing=${billing}&user=${user.email}`;
      window.open(backendUrl, "_blank");
    } catch (error) {
      console.error("Redirect error:", error);
      toast.error("Unable to start payment. Try again.");
    }
  };

  // Backend payment button option
  const getPlanButton = (planName) => {
    if (user.plan === planName) {
      return <button className="current-plan-btn">Current Plan</button>;
    }

    return (
      <button
        className="get-started-btn"
        onClick={() => handleBackendPayment(planName)}
      >
        Get Started
      </button>
    );
  };

  const adprices = {
    personal: "₦0",
    business: billing === "monthly" ? "₦40,000" : "₦48,000",
    team: billing === "monthly" ? "₦70,000" : "₦84,000",
  };

  const amountsInKobo = {
    business: billing === "monthly" ? 4000 * 100 : 48000 * 100,
    team: billing === "monthly" ? 4000 * 100 : 84000 * 100,
  };

  const freePlan = [
    "10 posts per month",
    "Only 1 image per post",
    "No ads",
    "No social media support",
    "Ideal for personal projects, testing, and casual use.",
  ];
  const businessPlan = [
    "Post Limit: 100 per month",
    "Media: Unlimited images",
    "Ads: 3 ads per month",
    "Social Sharing: Instagram, Facebook",
    "Ideal For: Growing businesses and entrepreneurs",
  ];

  const teamPlan = [
    "Post Limit: Unlimited",
    "Media: Unlimited images + videos",
    "Ads: 5 ads per month",
    "Social Sharing: Instagram, Facebook, TikTok, Twitter",
    "Ideal For: Brands, agencies, and teams managing content at scale",
  ];

  const features = [
    { title: "All plans include 24/7 email support!", desc: "" },
    {
      title: "Analytics Dashboard",
      desc: "helps track post performance over time.",
    },
    { title: "Upgrade anytime", desc: "as your needs grow!" },
  ];
  return (
    <div>
      <div className="adpricepage-container ">
        <main className="adpriceMainContent">
          <section className="adpriceHeadSection" data-aos="fade-down">
            <h1 className="adpricemain-heading">
              We’ve got a plan that’s perfect <br /> for you
            </h1>
            <div className="Bankdetails">
              <h1>For Direct Transfer</h1>
              <h5>Use this details below, for instant payment</h5>
              <div className="account-wrapper">
                {/* Left Side - ATM Card */}
                <div className="account-card">
                  <div className="card-header">
                    <h2 className="bank-name">Wema Bank</h2>
                    <div className="card-chip">₦</div>
                  </div>
                  <p className="card-number">0127016229</p>
                  <div className="card-footer">
                    <p>
                      Account Name
                      <br />
                      <strong>Advertorial hub ltd</strong>
                    </p>
                    <p>
                      Currency
                      <br />
                      <strong>Naira</strong>
                    </p>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="account-card">
                  <div className="card-header">
                    <h2 className="bank-name">Wema Bank</h2>
                    <div className="card-chip"> $</div>
                  </div>
                  <p className="card-number">0622028220</p>
                  <div className="card-footer">
                    <p>
                      Account Name
                      <br />
                      <strong>Advertorial hub ltd</strong>
                    </p>
                    <p>
                      Currency
                      <br />
                      <strong>Dollars</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="adbilling-toggle">
              <div className="toggle-background" data-active={billing}></div>
              <button
                className={`toggle-option ${
                  billing === "monthly" ? "active" : ""
                }`}
                onClick={() => setBilling("monthly")}>
                Monthly Billing
              </button>
              <button
                className={`toggle-option ${
                  billing === "annual" ? "active" : ""
                }`}
                onClick={() => setBilling("annual")}>
                Annual Billing
              </button>
            </div> */}
            <h2 className="adpricemain-heading">Monthly Billing</h2>
          </section>

          <section
            className="adpricing-section mild-zoom"
            data-aos="zoom-in"
            data-aos-delay="400"
            data-aos-duration="2000"
          >
            {/* Personal Plan */}
            <div className="adpricing-card" data-aos="zoom-in">
              <section className="adpriceplan-details">
                <div className="adpriceplan-header">
                  <h2 className="adpriceplan-title">
                    Personal Plan
                    <span className="adpriceplan-subtitle">
                      Perfect plan for starters
                    </span>
                  </h2>
                  <h1 className="plan-adprice">
                    {adprices.personal}
                    <span className="adpriceplan-subtitle">For a Lifetime</span>
                  </h1>
                </div>
                {user.plan === "PERSONAL" ? (
                  <button className="current-plan-btn">Current Plan</button>
                ) : (
                  <button className="get-started-btn" disabled>
                    Free Plan
                  </button>
                )}
              </section>
              <section className="adpriceplan-features">
                {freePlan.map((feature, i) => (
                  <p className="adpricefeature" key={i}>
                    <span>{icons.greencheck}</span> {feature}
                  </p>
                ))}
              </section>
            </div>

            {/* Business Plan */}
            <div className="adpricing-card business-plan">
              <section className="adpriceplan-details">
                <div className="adpriceplan-header">
                  <h2 className="adpriceplan-titlelight">
                    Business Plan
                    <br /> <br />
                    <span className="plan-subtitlelight">
                      For users who want to do more
                    </span>
                  </h2>
                  <h1 className="plan-adpricelight">
                    {adprices.business}
                    <span className="plan-subtitlelight">
                      {billing === "monthly" ? "per month" : "per year"}
                    </span>
                  </h1>
                </div>
                {user.plan === "BUSINESS" ? (
                  <button className="get-started-btn">Current Plan</button>
                ) : (
                  getPlanButton("BUSINESS")
                )}
              </section>
              <section className="adpriceplan-features">
                {businessPlan.map((feature, i) => (
                  <p className="adpricefeature" key={i}>
                    <span>{icons.greencheck}</span> {feature}
                  </p>
                ))}
              </section>
            </div>

            {/* Team Plan */}
            <div className="adpricing-card">
              <section className="adpriceplan-details">
                <div className="adpriceplan-header">
                  <h2 className="adpriceplan-title">
                    Team Plan
                    <span className="adpriceplan-subtitle">
                      Run your company on your terms
                    </span>
                  </h2>
                  <h1 className="plan-adprice">
                    {adprices.team}
                    <span className="adpriceplan-subtitle">
                      {billing === "monthly" ? "per month" : "per year"}
                    </span>
                  </h1>
                </div>
                {user.plan === "TEAM" ? (
                  <button className="current-plan-btn">Current Plan</button>
                ) : (
                  getPlanButton("TEAM")
                )}
              </section>
              <section className="adpriceplan-features">
                {teamPlan.map((feature, i) => (
                  <p className="adpricefeature" key={i}>
                    <span>{icons.greencheck}</span> {feature}
                  </p>
                ))}
              </section>
            </div>
          </section>

          {/* Features Section */}
          {/* <section
            className="Prifeatures-section"
            aria-labelledby="Prifeatures-heading"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="Prifeatures-inner">
              <h3
                id="features-heading"
                className="features-title"
                data-aos="fade-right"
                data-aos-delay="100"
              >
                What’s included
              </h3>

              <ul className="Prifeatures-list">
                {features.map((f, i) => (
                  <li
                    className="Prifeature-item"
                    key={i}
                    data-aos="fade-up"
                    data-aos-delay={i * 150}
                    data-aos-duration="700"
                  >
                    <span className="Prifeature-icon" aria-hidden="true">
                      🔹
                    </span>
                    <span className="Prifeature-text">
                      <strong>{f.title}</strong>
                      {f.desc ? ` ${f.desc}` : ""}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section> */}
        </main>
      </div>

      <footer className="dashFooter">
        <p>&copy; 2025 Advertorial Hub. All Rights Reserved.</p>
        <a href="/Policy">Privacy Policy</a> | <a href="/AboutUs">About Us</a>
      </footer>
    </div>
  );
}
