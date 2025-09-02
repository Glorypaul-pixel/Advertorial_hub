import React from "react";
import "@/styles/Explore.css";
import Link from "next/link";

const Explore = () => {
  const icons = [
    { id: "google", src: "/images/Google.png", alt: "Google" },
    { id: "microsoft", src: "/images/Microsoft.png", alt: "Microsoft" },
    { id: "mailchimp", src: "/images/Mailchimp.png", alt: "Mailchimp" },
    { id: "fb", src: "/images/fb.png", alt: "Facebook" },
    { id: "logo", src: "/images/AH-BLUE-BG.jpg", alt: "Logo" },
    { id: "linkedin", src: "/images/Linkedin.png", alt: "LinkedIn" },
    { id: "tiktok", src: "/images/Tiktok.png", alt: "TikTok" },
    { id: "whatsapp", src: "/images/WhatsApp.png", alt: "WhatsApp" },
  ];

  return (
    <div className="BgColorExplore">
      {/* Background Image */}
      <div className="ExplorebgImg"></div>

      {/* Icons Section */}
      <div className="ExploreIconsContainer">
        <div className="ExploreIcons">
          {icons.map((icon, index) => (
            <img key={index} src={icon.src} alt={icon.alt} />
          ))}
        </div>
      </div>

      {/* Button Below Icons */}

      {/* Content Section */}
      <div className="exploreContent">
        <Link href="/Integrate" className="custom-link">
          <button className="exploreButton" data-aos="fade-down">
            Explore Integration
          </button>
        </Link>

        <h1 data-aos="zoom-in">
          Get your brand in front of the people who matter most
        </h1>
        <Link href="/authentication/CreateAccount">
          <button className="ExbtnStart" data-aos="fade-up">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Explore;
