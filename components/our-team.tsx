import type { NextPage } from "next";
import AboutContent from "./about-content";
import CardTeam1 from "./card-team1";

export type OurTeamType = {
  className?: string;
};

const OurTeam: NextPage<OurTeamType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-start justify-start py-10 px-32 gap-10 text-left text-base text-white font-josefin-sans ${className}`}
    >
      <AboutContent
        aboutHeadingWidth="unset"
        aboutHeadingAlignSelf="stretch"
        aboutGenomaGames="Our Team"
        foundedInWereATeamOfPa="The talented individuals behind our gaming experiences, "
        weveAlwaysWantedToPlay="each bringing unique skills and passion to our studio."
      />
      <div className="self-stretch flex flex-row items-start justify-center gap-10">
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
      <div className="self-stretch flex flex-row items-start justify-center gap-10">
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
