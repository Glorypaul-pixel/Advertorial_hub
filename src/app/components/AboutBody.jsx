\ import React from "react";
import "@/styles/AboutBody.css";
const AboutBody = () => {
  return (
    <div className="aboutBodyContent">
      <div className="aboutBodyText">
        <div className="aboutBodyHead">
          <h2 data-aos="fade-down">About us</h2>
        </div>
        <h1 data-aos="fade-up">This is Advertorial Hub</h1>
        <p data-aos="fade-up">
          At Advertorial Hub, we specialize in empowering businesses by crafting
          online advertising strategies that make a difference. Whether it’s
          expanding your reach on social media or creating high-converting ad
          campaigns, we’re dedicated to helping you achieve impactful results.
        </p>
        <div className="aboutBodyHub">
          <div className="hub1" data-aos="flip-left">
            <div className="imgHub imgHub1">
              <img src="/images/advertising.png" alt="" />
            </div>
            <h4>Social Media Advertising</h4>
          </div>
          <div className="hub2" data-aos="flip-right">
            <div className="imgHub imgHub2">
              <img src="/images/campaign-management.png" alt="" />
            </div>
            <h4>Campaign Management</h4>
          </div>
          <div className="hub3" data-aos="flip-right">
            <div className="imgHub imgHub3">
              <img src="/images/creative.png" alt="" />
            </div>
            <h4>Content Creation</h4>
          </div>
        </div>
      </div>
      <div className="aboutBodyAim">
        <div className="aboutBodyMission">
          <h1 data-aos="fade-up">Our Mission</h1>
          <p data-aos="flip-left">
            Our mission is simple yet powerful: to deliver advertising solutions
            that not only capture attention but drive meaningful connections
            with your target audience. We believe every brand has a unique
            story, and our goal is to amplify that story to attract, engage, and
            retain loyal customers.
          </p>
        </div>
        <div className="aboutBodyValue">
          <h1 data-aos="fade-up">Our Values</h1>
          <p data-aos="flip-right">
            Our core values centre around innovation, integrity, and client
            success. We continually explore the latest trends and technologies
            to keep your brand relevant and visible. Transparency and trust are
            also at the heart of everything we do, ensuring our clients feel
            confident every step of the way.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutBody;
