"use client";

import React from "react";
import "@/styles/Footer.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="footer" data-aos="fade-up" data-aos-duration="800">
      <div className="footerBg">
        {/* Logo & Description */}
        <div className="footerLogo" data-aos="fade-up" data-aos-delay="100">
          <div className="footerImg">
            <Link href="/">
              <img src="/images/logo.png" alt="Logo" />
            </Link>
          </div>
          <p>The Payments Platform Designed to Put Merchants First</p>
          <p>&copy; 2024 Advertorial Hub. All rights reserved.</p>
        </div>

        <hr data-aos="zoom-in" data-aos-delay="150" />

        {/* Resources Section */}
        <div
          className="footerResource"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h2>Resource</h2>
          <ul>
            <Link href="/Pricing" className="custom-link">
              <li>Pricing</li>
            </Link>
            <Link href="/Blog" className="custom-link">
              <li>Blog</li>
            </Link>
          </ul>
        </div>

        <hr data-aos="zoom-in" data-aos-delay="250" />

        {/* About Us Section */}
        <div className="footerAbout" data-aos="fade-left" data-aos-delay="300">
          <h2>About Us</h2>
          <ul>
            <Link href="/AboutUs" className="custom-link">
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

        <hr data-aos="zoom-in" data-aos-delay="350" />

        {/* Contact Section */}
        <div className="footerContact" data-aos="fade-up" data-aos-delay="400">
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
