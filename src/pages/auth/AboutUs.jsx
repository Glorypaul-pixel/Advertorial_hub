import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Explore from "@/components/Explore";
import AboutBody from "@/components/AboutBody";
import AdvertisePage from "../../components/AdvertisePage";
const AboutUs = () => {
  return (
    <div>
      <Header />
      <AboutBody />
      <AdvertisePage />
      <Explore />
      <Footer />
    </div>
  );
};

export default AboutUs;
