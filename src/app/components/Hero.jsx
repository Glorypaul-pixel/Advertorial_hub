import React from "react";
import "@/styles/Hero.css";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="heroSection">
      {/* Hero Text Section */}
      <div className="heroText">
        <div className="heroHeadlineContainer" data-aos="fade-up">
          {/* Left (2/3) */}
          <div className="headline-text">
            <h1>
              Connect with Your Target Audience And <span>Drive Sales</span> With
              AdvertorialHub
            </h1>

            <p data-aos="fade-right">
              To reach the right people on social media, you need the right tools.{" "}
              <br />
              With <span>Advertorial Hub</span>, you{"'"}ve got everything you need!
            </p>
            <Link href="/authentication/CreateAccount">
              <button className="HerobtnStart" data-aos="zoom-in">
                Start Now
              </button>
            </Link>
          </div>

          {/* Right (1/3) */}
          <div className="headline-image">
            <img src="/images/this.png" alt="headline visual" />
          </div>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="heroImage">
        <img
          src="/images/image.png"
          alt="ladyimg"
          className="lady-img"
          data-aos="fade-right"
        />
        <div
          className="rightimg-container"
          data-aos="zoom-in"
          data-aos-delay="400"
        >
          <img
            src="/images/image1bg.png"
            alt="Background Image"
            className="image-bg"
          />
          <img src="/images/image1.png" alt="Logo" className="image-overlay" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
