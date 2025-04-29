import React from "react";
import "@/styles/AdvertisePage.css";
const AdvertisePage = () => {
  return (
    <div id="advertHead">
      <div className="advertHead">
        <h2>Advertising solutions to meet your goals</h2>
        <p>
          Whatever your business goals are, we{"'"}ll help you achieve your
          marketing objectives.
        </p>
      </div>
      <div className="advertGoals">
        <div className="scalability">
          <div className="scaleImg">
            <img src="/images/insight1.png" alt="insight1" />
          </div>
          <h3>Scalability</h3>
          <p>
            Scale advertising efforts, adapting to larger campaigns, new
            markets, or different platforms to support expansion goals.
          </p>
        </div>
        <div className="dataDriven">
          <div className="dataImg">
            <img src="/images/insight.png" alt="Insight" />
          </div>
          <h3>Data-Driven Campaigns</h3>
          <p>
            Tailor campaigns based on real data, optimizing strategies for
            better result and continually refining approaches to maximize
            effectiveness.
          </p>
        </div>
        <div className="targetAud">
          <div className="targetImg">
            <img src="/images/insight2.png" alt="" />
          </div>
          <h3>Target Audience Reach</h3>
          <p>
            Reach specific audiences, ensuring ads are seen by those most likely
            to be interested in the product or services
          </p>
        </div>
        <div className="costEffect">
          <div className="costImg">
            <img src="/images/insight3.png" alt="" />
          </div>
          <h3>Cost-Effective Marketing</h3>
          <p>
            Reduce marketing cost compared to traditional advertise helping
            companies allocate budget efficiently
          </p>
        </div>
        <div className="enhanceCust">
          <div className="enhanceImg">
            <img src="/images/insight4.png" alt="" />
          </div>
          <h3>Enhanced Customer Engagement</h3>
          <p>
            Create content and strategies that encourage interaction, building
            stronger relationships and customer loyalty.
          </p>
        </div>
        <div className="visibilty">
          <div className="BrandImg">
            <img src="/images/insight5.png" alt="" />
          </div>
          <h3>Increased Brand Visibility</h3>
          <p>
            Increase brand visibility across platforms, making it easier for
            potential customers to recognize and remember the brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdvertisePage;
