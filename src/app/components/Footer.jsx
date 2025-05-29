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
            <Link href="/Pricing" className="custom-link">
              {" "}
              <li>Pricing</li>
            </Link>
            <Link href="/Blog" className="custom-link">
              <li>Blog</li>
            </Link>
          </ul>
        </div>

        <hr />

        {/* About Us Section */}
        <div className="footerAbout">
          <h2>About Us</h2>
          <ul>
            <Link href="/AboutUs" className="custom-link">
              {" "}
              <li>About Us</li>
            </Link>
            <Link href="/Policy" className="custom-link">
              <li>Privacy Policy</li>
            </Link>
            <Link href="/Terms" className="custom-link">
              <li>Terms and Services</li>
            </Link>
          </ul>
        </div>

        <hr />

        {/* Contact Section */}
        <div className="footerContact">
          <h2>Contact</h2>
          <ul>
            <li>
              <a
                href="https://wa.me/2348065137645"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:underline"
              >
                +234 8065 137 645
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/Techk_e4ma"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://facebook.com/madubueze.ifeomagloria"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/madubueze-gloria-ifeoma"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/techk_e4ma"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com/@techk_e4ma"
                target="_blank"
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
