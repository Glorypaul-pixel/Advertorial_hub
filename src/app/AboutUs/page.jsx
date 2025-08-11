import React from "react";
import Explore from "@/app/components/Explore";
import AboutBody from "@/app/components/AboutBody";
import AdvertisePage from "@/app/components/AdvertisePage";
const aboutUs = () => {
  return (
    <div>
      <AboutBody />
      <AdvertisePage />
      <Explore />
    </div>
  );
};

export default aboutUs;
