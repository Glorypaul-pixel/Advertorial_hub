import React from "react";
import "../styles/Hero.css";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="heroSection">
      <div className="heroText">
        <h1>
          Connect with Your Target Audience And <span>Drive Sales</span>With
          AdvertorialHub
        </h1>
        <p>
          To reach the right people on social media, you need the right tools. <br />
          With Advertorial Hub, you{"'"}ve got everything you need!
        </p>
        <Link href="/auth/CreateAccount">
          <button className="btnStart">Start Now</button>
        </Link>
      </div>
      <div className="heroImage">
        <img src="/images/image.png" alt="ladyimg" className="lady-img" />
        <div className="rightimg-container">
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
