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
      className={`h-[550px] w-[318px] flex flex-col items-start justify-start text-left text-base text-white font-josefin-sans ${className}`}
    >
      <div className="self-stretch h-[300px] rounded-t-2xl rounded-b-none max-w-full shrink-0 overflow-hidden relative flex items-center justify-center">
        <Image
          className="self-stretch h-full overflow-hidden shrink-0 object-cover absolute left-[0px] top-[0px] w-full [transform:scale(1)]"
          loading="lazy"
          fill
          alt=""
          src={photo}
        />
      </div>
      <div className="self-stretch h-[250px] rounded-t-none rounded-b-2xl bg-gray-100 flex flex-col items-start justify-start p-6 box-border gap-3.5">
        <b className="self-stretch relative text-xl leading-[20px]">
          {albertoFernandez}
        </b>
        <div className="self-stretch relative leading-[20px] font-medium text-Color-Main">
          {creativeTechnology}
        </div>
        <div className="self-stretch relative leading-[20px] font-light">
          {withOverYearsInGameDesign}
        </div>
        <div className="w-6 relative max-h-full overflow-hidden h-6 flex items-center justify-center">
          <Image
            className="w-full overflow-hidden object-cover absolute left-[0px] top-[0px] h-full [transform:scale(1)]"
            loading="lazy"
            fill
            alt=""
            src="/5282542-linkedin-network-social-network-linkedin-logo-icon-1.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default CardTeam1;
