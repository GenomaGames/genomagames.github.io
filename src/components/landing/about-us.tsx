import type { NextPage } from "next";
import Image from "next/image";

import AboutContent from "./about-content";
import Card1 from "./card1";

export type AboutUsType = {
  className?: string;
};

const AboutUs: NextPage<AboutUsType> = ({ className = "" }) => {
  return (
    <section
      className={`text-45xl font-born2bsporty-fs flex flex-col items-start justify-start gap-10 self-stretch px-32 py-10 text-left text-white ${className}`}
    >
      <AboutContent
        aboutGenomaGames="About Genoma Games"
        foundedInWereATeamOfPa="Founded in 2015, we're a team of passionate gamers creating experiences "
        weveAlwaysWantedToPlay="we've always wanted to play."
      />
      <div className="text-13xl flex flex-row items-start justify-start gap-6 self-stretch">
        <div className="flex flex-1 flex-col items-start justify-start gap-6">
          <h2 className="relative m-0 font-[inherit] text-[length:inherit] leading-[50px] font-normal uppercase">
            Our Story
          </h2>
          <div className="font-josefin-sans relative self-stretch text-xl leading-[20px]">
            <p className="m-0">{`Nexus Studios began with five friends sharing a small apartment and a big dream: to create games that would push the boundaries of the medium. `}</p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0">
              What started as late-night brainstorming sessions has grown into a
              vibrant studio with over 50 talented developers.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0">{`Our journey hasn't been without challenges, but our commitment to innovation and player-centric design has allowed us to create award-winning experiences that resonate with gamers worldwide. `}</p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0">
              With each project, we aim to push our creative boundaries further
              and deliver experiences that stay with players long after
              they&apos;ve put down the controller.
            </p>
          </div>
        </div>
        <div className="relative flex h-[376px] max-w-full flex-1 items-center justify-center overflow-hidden">
          <Image
            className="absolute top-[0px] left-[0px] h-full w-full flex-1 [transform:scale(1)] overflow-hidden object-cover"
            loading="lazy"
            fill
            alt=""
            src="/landing/frame-15@2x.png"
          />
        </div>
      </div>
      <div className="font-josefin-sans flex flex-row items-start justify-start gap-10 self-stretch text-xl">
        <Card1
          gameGamingJoystickMedia="/6363267-game-gaming-joystick-media-play-icon-1.svg"
          playerCenteringDesign="Player-Centering Design"
          weCreateGamesWithPlayersAt="We create games with players at the center of every decision, ensuring engaging and memorable experiences."
        />
        <Card1
          card1BorderTop="1px solid #0bb3de"
          card1Padding="24px"
          gameGamingJoystickMedia="/2897334-chip-computer-intelligence-processor-technology-icon-1.svg"
          playerCenteringDesign="Cutting-Edge Technology"
          weCreateGamesWithPlayersAt="Our in-house engine pushes the boundaries of what's possible, delivering stunning visuals and innovative gameplay."
        />
        <Card1
          card1BorderTop="1px solid #d946ef"
          card1Padding="24px"
          gameGamingJoystickMedia="/8666755-users-group-icon-1.svg"
          playerCenteringDesign="Diverse Perspectives"
          weCreateGamesWithPlayersAt="Our international team brings unique viewpoints to our creative process, enriching our storytelling and world-building."
        />
        <Card1
          card1BorderTop="1px solid #ffe015"
          card1Padding="24px"
          gameGamingJoystickMedia="/4230510-bulb-idea-light-icon-1.svg"
          playerCenteringDesign="Creative Freedom"
          weCreateGamesWithPlayersAt="We empower our teams to take creative risks and explore new ideas, leading to bold and original gaming experiences."
        />
      </div>
    </section>
  );
};

export default AboutUs;
