import type { NextPage } from "next";
import Image from "next/image";

export type CardTeam1Type = {
  className?: string;
  photo: string;
  albertoFernandez?: string;
  creativeTechnology?: string;
  withOverYearsInGameDesign?: string;
};

const CardTeam1: NextPage<CardTeam1Type> = ({
  className = "",
  photo,
  albertoFernandez,
  creativeTechnology,
  withOverYearsInGameDesign,
}) => {
  return (
    <div
      className={`font-josefin-sans flex h-[550px] w-[318px] flex-col items-start justify-start text-left text-base text-white ${className}`}
    >
      <div className="relative flex h-[300px] max-w-full shrink-0 items-center justify-center self-stretch overflow-hidden rounded-t-2xl rounded-b-none">
        <Image
          className="absolute top-[0px] left-[0px] h-full w-full shrink-0 [transform:scale(1)] self-stretch overflow-hidden object-cover"
          loading="lazy"
          fill
          alt=""
          src={photo}
        />
      </div>
      <div className="box-border flex h-[250px] flex-col items-start justify-start gap-3.5 self-stretch rounded-t-none rounded-b-2xl bg-gray-100 p-6">
        <b className="relative self-stretch text-xl leading-[20px]">
          {albertoFernandez}
        </b>
        <div className="text-Color-Main relative self-stretch leading-[20px] font-medium">
          {creativeTechnology}
        </div>
        <div className="relative self-stretch leading-[20px] font-light">
          {withOverYearsInGameDesign}
        </div>
        <div className="relative flex h-6 max-h-full w-6 items-center justify-center overflow-hidden">
          <Image
            className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] overflow-hidden object-cover"
            loading="lazy"
            fill
            alt=""
            src="/landing/5282542-linkedin-network-social-network-linkedin-logo-icon-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default CardTeam1;
