// src/app/page.jsx (this is your homepage)
import Hero from "@/app/components/Hero";
import AdvertisePage from "@/app/components/AdvertisePage";
import AdvertWork from "@/app/components/AdvertWork";
import Explore from "./components/Explore";

export default function Home() {
  return (
    <>
      <Hero />
      <AdvertisePage />
      <AdvertWork />
      <Explore />
    </>
  );
}
