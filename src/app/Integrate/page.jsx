import React from "react";
import Explore from "@/app/components/Explore";
import "@/styles/Integration.css";
const Integration = () => {
  return (
    <div>
      <div className="integration">
        <h1>Integration</h1>
        <p>
          Enhance your Advertorial Hub experience with a wide variety of add-ons
          and integrations.
        </p>
        <div className="integrateCard">
          <div className="integrateCard1">
            <div className="integrateCard1Img">
              <img src="/images/IntMic.png" alt="" />
            </div>
            <p>Microsoft</p>
          </div>
          <div className="integrateCard2">
            <div className="integrateCard2Img">
              <img src="/images/IntMail.png" alt="" />
            </div>
            <p>Mailchimp</p>
          </div>
          <div className="integrateCard3">
            <div className="integrateCard3Img">
              <img src="/images/IntGoogle.png" alt="" />
            </div>
            <p>Google</p>
          </div>
          <div className="integrateCard4">
            <div className="integrateCard4Img">
              <img src="/images/IntTik.png" alt="" />
            </div>
            <p>Tiktok</p>
          </div>
          <div className="integrateCard5">
            <div className="integrateCard5Img">
              <img src="/images/IntLinked.png" alt="" />
            </div>
            <p>LinkedIn</p>
          </div>
          <div className="integrateCard6">
            <div className="integrateCard6Img">
              <img src="/images/IntWhat.png" alt="" />
            </div>
            <p>WhatsApp</p>
          </div>
          <div className="integrateCard7">
            <div className="integrateCard7Img">
              <img src="/images/IntX.png" alt="" />
            </div>
            <p>Twitter</p>
          </div>
          <div className="integrateCard8">
            <div className="integrateCard8Img">
              <img src="/images/IntFb.png" alt="" />
            </div>
            <p>Facebook</p>
          </div>
        </div>
      </div>
      <Explore />
    </div>
  );
};

export default Integration;
