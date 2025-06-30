import React from "react";
import "@/styles/Hero.css";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="heroSection" >
      {/* Hero Text Section */}
      <div className="heroText" >
        <h1 data-aos="fade-up">
          Connect with Your Target Audience And <span>Drive Sales</span> With
          AdvertorialHub
        </h1>
        <p data-aos="fade-right" >
          To reach the right people on social media, you need the right tools.{" "}
          <br />
          With Advertorial Hub, you{"'"}ve got everything you need!
        </p>
        <Link href="/authentication/CreateAccount">
          <button className="btnStart" data-aos="zoom-in">
            Start Now
          </button>
        </Link>
      </div>

      {/* Hero Image Section */}
      <div className="heroImage"  >
        <img src="/images/image.png" alt="ladyimg" className="lady-img" data-aos="fade-right" />
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
