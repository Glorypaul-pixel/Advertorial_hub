"use client";
import { icons } from "../../lib/Icons";
import "../../styles/Pricing.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const Pricing = () => {
  return (
    <div>
      <Header />
      {/* container  */}
      <div  className=" Pricepage-container" >
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
                  <span className=" Priceplan-subtitle ">For a Lifetime</span>
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
              <p className="Pricefeaturelight ">
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
      
      <Footer />
    </div>
  );
};

export default Pricing;
