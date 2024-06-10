import React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

export function PremiumIcon(props) {
  return (
    <Svg
      width={26}
      height={26}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 13C2 6.925 6.925 2 13 2s11 4.925 11 11-4.925 11-11 11S2 19.075 2 13zM13 0C5.82 0 0 5.82 0 13s5.82 13 13 13 13-5.82 13-13S20.18 0 13 0zm1 6.333a1 1 0 10-2 0V13a1 1 0 00.293.707l4 4a1 1 0 001.414-1.414L14 12.586V6.333z"
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={-8.01492}
          y1={-2.03921}
          x2={29.102}
          y2={2.14217}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0892F9" />
          <Stop offset={1} stopColor="#87E4DB" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}