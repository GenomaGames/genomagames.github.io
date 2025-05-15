import type { NextPage } from "next";

import AboutContent from "./about-content";
import CardTeam1 from "./card-team1";

export type OurTeamType = {
  className?: string;
};

const OurTeam: NextPage<OurTeamType> = ({ className = "" }) => {
  return (
    <section
      className={`font-josefin-sans flex flex-col items-start justify-start gap-10 self-stretch px-32 py-10 text-left text-base text-white ${className}`}
    >
      <AboutContent
        aboutHeadingWidth="unset"
        aboutHeadingAlignSelf="stretch"
        aboutGenomaGames="Our Team"
        foundedInWereATeamOfPa="The talented individuals behind our gaming experiences, "
        weveAlwaysWantedToPlay="each bringing unique skills and passion to our studio."
      />
      <div className="flex flex-row items-start justify-center gap-10 self-stretch">
        <CardTeam1
          photo="/photo@2x.png"
          albertoFernandez="Alberto Fernandez"
          creativeTechnology="Creative Technology"
          withOverYearsInGameDesign="With over 15 years in game design, Alberto leads our creative vision with a passion for storytelling and player experience."
        />
        <CardTeam1
          photo="/photo-1@2x.png"
          albertoFernandez="Fran Aranda"
          creativeTechnology="Developer Manager"
          withOverYearsInGameDesign="With over 15 years in game design, Alberto leads our creative vision with a passion for storytelling and player experience."
        />
        <CardTeam1
          photo="/photo-2@2x.png"
          albertoFernandez="Raúl Marín"
          creativeTechnology="UX Designer"
          withOverYearsInGameDesign="Raúl brings worlds to life through her striking visual direction and ability to inspire our talented art team."
        />
      </div>
      <div className="flex flex-row items-start justify-center gap-10 self-stretch">
        <CardTeam1
          photo="/photo@2x.png"
          albertoFernandez="Alberto Fernandez"
          creativeTechnology="Creative Technology"
          withOverYearsInGameDesign="With over 15 years in game design, Alberto leads our creative vision with a passion for storytelling and player experience."
        />
        <CardTeam1
          photo="/photo-1@2x.png"
          albertoFernandez="Fran Aranda"
          creativeTechnology="Developer Manager"
          withOverYearsInGameDesign="With over 15 years in game design, Alberto leads our creative vision with a passion for storytelling and player experience."
        />
        <CardTeam1
          photo="/photo-2@2x.png"
          albertoFernandez="Raúl Marín"
          creativeTechnology="UX Designer"
          withOverYearsInGameDesign="Raúl brings worlds to life through her striking visual direction and ability to inspire our talented art team."
        />
      </div>
    </section>
  );
};

export default OurTeam;
