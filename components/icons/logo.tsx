

import type { SVGProps } from "react";

export const Logo = (props: SVGProps<SVGSVGElement>) => (
    <svg
    width="50"
    height="50"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="50" height="50" fill="none" />
    <text
      x="10"
      y="65"
      fontFamily="'Brush Script MT', cursive"
      fontSize="50"
      className="fill-accent-foreground"
     
    >
      H
    </text>
    <text
      x="50"
      y="65"
      fontFamily="'Brush Script MT', cursive"
      fontSize="50"
      fill="#13E8E9"
    >
      T
    </text>
  </svg>
)