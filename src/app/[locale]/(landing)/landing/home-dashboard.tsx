import type { NextPage } from "next";
import Image from "next/image";

import AboutUs from "@/src/components/landing/about-us";
import Content from "@/src/components/landing/content";
import Header from "@/src/components/landing/header";
import HeroBanner from "@/src/components/landing/hero-banner";
import OurTeam from "@/src/components/landing/our-team";

const HomeDashboard: NextPage = () => {
  return (
    <div className="flex w-full flex-col items-start justify-start overflow-hidden bg-gray-200">
      <section className="flex h-[728px] flex-col items-start justify-start self-stretch bg-[url('/div-1@3x.png')] bg-cover bg-[top] bg-no-repeat">
        <Header />
        <HeroBanner />
      </section>
      <Content />
      <AboutUs />
      <OurTeam />
      <div className="relative flex h-[661px] max-h-full max-w-full items-center justify-center self-stretch overflow-hidden">
        <Image
          className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] self-stretch overflow-hidden object-cover"
          fill
          alt=""
          src="/landing/captura-de-pantalla-20250514-a-las-180634-1@2x.png"
        />
      </div>
    </div>
  );
};

export default HomeDashboard;
