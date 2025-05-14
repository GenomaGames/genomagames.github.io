"use client";
import type { NextPage } from "next";
import { useMemo, type CSSProperties } from "react";
import Image from "next/image";

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
      className={`w-2.5 relative h-2.5 overflow-hidden shrink-0 ${className}`}
      data-property1={property1}
    >
      <div className="absolute h-[83%] w-[83%] top-[8%] right-[9%] bottom-[9%] left-[8%] max-w-full max-h-full overflow-hidden flex items-center justify-center">
        <Image
          className="h-full w-full overflow-hidden object-cover absolute left-[0px] top-[0px] [transform:scale(1)]"
          fill
          alt=""
          src={vector}
        />
      </div>
      <Image
        className="relative w-[17px] h-5 hidden"
        fill
        alt=""
        src={subtract}
        style={subtractIconStyle}
      />
    </div>
  );
};

export default Iconstar;
