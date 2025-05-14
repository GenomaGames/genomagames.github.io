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
      className={`self-stretch flex flex-col items-start justify-start py-10 px-32 gap-10 text-left text-45xl text-white font-born2bsporty-fs ${className}`}
    >
      <AboutContent
        aboutGenomaGames="About Genoma Games"
        foundedInWereATeamOfPa="Founded in 2015, we're a team of passionate gamers creating experiences "
        weveAlwaysWantedToPlay="we've always wanted to play."
      />
      <div className="self-stretch flex flex-row items-start justify-start gap-6 text-13xl">
        <div className="flex-1 flex flex-col items-start justify-start gap-6">
          <h2 className="m-0 relative text-[length:inherit] leading-[50px] uppercase font-normal font-[inherit]">
            Our Story
          </h2>
          <div className="self-stretch relative text-xl leading-[20px] font-josefin-sans">
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
              and deliver experiences that stay with players long after they've
              put down the controller.
            </p>
          </div>
        </div>
        <div className="h-[376px] flex-1 max-w-full overflow-hidden relative flex items-center justify-center">
          <Image
            className="h-full flex-1 overflow-hidden object-cover absolute left-[0px] top-[0px] w-full [transform:scale(1)]"
            loading="lazy"
            fill
            alt=""
            src="/frame-15@2x.png"
          />
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start gap-10 text-xl font-josefin-sans">
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
