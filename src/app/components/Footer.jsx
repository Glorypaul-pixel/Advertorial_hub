"use client";

import React from "react";
import "@/styles/Footer.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="footer">
      <div className="footerBg">
        {/* Logo & Description */}
        <div className="footerLogo">
          <div className="footerImg">
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>
          <p>The Payments Platform Designed to Put Merchants First</p>
          <p>&copy; 2024 Advertorial Hub. All rights reserved.</p>
        </div>

        <hr />

        {/* Resources Section */}
        <div className="footerResource">
          <h2>Resource</h2>
          <ul>
            <Link href="/auth/Pricing" className="custom-link">
              {" "}
              <li>Pricing</li>
            </Link>
            <Link href="/auth/Blog" className="custom-link">
              <li>Blog</li>
            </Link>
          </ul>
        </div>

        <hr />

        {/* About Us Section */}
        <div className="footerAbout">
          <h2>About Us</h2>
          <ul>
            <Link href="/auth/AboutUs" className="custom-link">
              {" "}
              <li>About Us</li>
            </Link>
            <Link href="/auth/Policy" className="custom-link">
              <li>Privacy Policy</li>
            </Link>
            <Link href="/auth/Terms" className="custom-link">
              <li>Terms and Services</li>
            </Link>
          </ul>
        </div>

        <hr />

        {/* Contact Section */}
        <div className="footerContact">
          <h2>Contact</h2>
          <ul>
            <li>08132581551</li>
            <li>Twitter</li>
            <li>Facebook</li>
            <li>LinkedIn</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
