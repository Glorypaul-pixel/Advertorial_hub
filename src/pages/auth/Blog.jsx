import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/Blog.css";
const Blog = () => {
  return (
    <div>
      <Header />
      <div className="BlogContainer">
        <div className="blogHero">
          <div className="BlogHead">
            <h1>The Advertorial Blog</h1>
            <p>
              Product updates, announcements, conversations about customer
              engagement and more.
            </p>
          </div>
          <div className="blogSaas">
            <img src="/images/card4.png" alt="" />
            <div className="blogSaasText">
              <h5>Customer Retention</h5>
              <h1>How SaaS Businesses Can Reduce Churn</h1>
              <p>
                For most SaaS businesses, there’s often an intense focus on
                attracting new customers. Startups view rapid customer
                acquisition as the fast track to skyrocketing revenue. However,
                beyond customer acquisition, it is important to have users stick
                around for a long time because recurring revenue from existing
                customers is easiert
              </p>
              <h6>Oct 25, 2024 - 5min read</h6>
            </div>
          </div>
        </div>
        <div className="blogCard">
          <div className="BlogCard1">
            <img src="/images/card5.png" alt="" />
            <div className="BlogCard1Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
          <div className="BlogCard2">
            <img src="/images/card6.png" alt="" />
            <div className="BlogCard2Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
          <div className="BlogCard3">
            <img src="/images/card7.png" alt="" />
            <div className="BlogCard3Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
          <div className="BlogCard4">
            <img src="/images/card6.png" alt="" />
            <div className="BlogCard4Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
          <div className="BlogCard5">
            <img src="/images/card7.png" alt="" />
            <div className="BlogCard3Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
          <div className="BlogCard6">
            <img src="/images/card5.png" alt="" />
            <div className="BlogCard3Text">
              <h2>Enhancing Customer Engagement with Email Suppression</h2>
              <p>
                When it comes to customer engagement, it is important to have a
                clear understanding of the groups that make up your audience.
                Because your
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
