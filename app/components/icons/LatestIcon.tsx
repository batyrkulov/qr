import * as React from "react"
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg"

export function LatestIcon(props) {
  return (
    <Svg
      width={26}
      height={23}
      viewBox="0 0 26 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 .667a1 1 0 00-.857.485l-4 6.667A1 1 0 00.255 9l11.333 12.667.031.033a1.932 1.932 0 002.793-.033L25.745 9a1 1 0 00.113-1.181l-4-6.667A1 1 0 0021 .667H5zM2.237 8.216l3.33-5.55h14.867l3.33 5.55L13 20.246 2.237 8.216zm7.087-.968a1 1 0 10-1.715-1.03l-.8 1.334a1 1 0 00.118 1.187l2.666 2.934a1 1 0 101.48-1.346L8.907 7.944l.417-.696z"
        fill="url(#paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear"
          x1={-8.01492}
          y1={-1.02842}
          x2={28.8952}
          y2={3.97357}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0892F9" />
          <Stop offset={1} stopColor="#87E4DB" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}
