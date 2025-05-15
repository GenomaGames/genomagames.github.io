"use client";
import type { NextPage } from "next";
import Image from "next/image";
import { type CSSProperties, useMemo } from "react";

export type IconstarType = {
  className?: string;
  vector: string;
  subtract: string;

  /** Variant props */
  property1?: 0;

  /** Style props */
  subtractIconHeight?: CSSProperties["height"];
};

const Iconstar: NextPage<IconstarType> = ({
  className = "",
  property1 = 1,
  vector,
  subtract,
  subtractIconHeight,
}) => {
  const subtractIconStyle: CSSProperties = useMemo(() => {
    return {
      height: subtractIconHeight,
    };
  }, [subtractIconHeight]);

  return (
    <div
      className={`relative h-2.5 w-2.5 shrink-0 overflow-hidden ${className}`}
      data-property1={property1}
    >
      <div className="absolute top-[8%] right-[9%] bottom-[9%] left-[8%] flex h-[83%] max-h-full w-[83%] max-w-full items-center justify-center overflow-hidden">
        <Image
          className="absolute top-[0px] left-[0px] h-full w-full [transform:scale(1)] overflow-hidden object-cover"
          fill
          alt=""
          src={vector}
        />
      </div>
      {/* <Image
        className="relative hidden h-5 w-[17px]"
        fill
        alt=""
        src={subtract}
        style={subtractIconStyle}
      /> */}
    </div>
  );
};

export default Iconstar;
