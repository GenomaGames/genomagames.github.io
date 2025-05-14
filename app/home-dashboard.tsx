import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/header";
import HeroBanner from "../components/hero-banner";
import Content from "../components/content";
import AboutUs from "../components/about-us";
import OurTeam from "../components/our-team";

const HomeDashboard: NextPage = () => {
  return (
    <div className="w-full h-[4386px] relative bg-gray-200 overflow-hidden flex flex-col items-start justify-start">
      <section className="self-stretch h-[728px] flex flex-col items-start justify-start bg-[url('/div-1@3x.png')] bg-cover bg-no-repeat bg-[top]">
        <Header />
        <HeroBanner />
      </section>
      <Content />
      <AboutUs />
      <OurTeam />
      <div className="self-stretch relative max-w-full max-h-full overflow-hidden h-[661px] flex items-center justify-center">
        <Image
          className="self-stretch overflow-hidden object-cover absolute left-[0px] top-[0px] w-full h-full [transform:scale(1)]"
          fill
          alt=""
          src="/captura-de-pantalla-20250514-a-las-180634-1@2x.png"
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
