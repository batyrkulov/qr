import * as React from "react"
import Svg, { Circle, Defs, G, LinearGradient, Path, Stop,SvgProps } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={104} height={104} viewBox="0 0 104 75" fill="none" {...props}>
      <G>
        <G>
          <Circle cx={52} cy={36} r={28} fill="url(#prefix__paint0_linear)" />
        </G>
        <Path
          d="M42.667 36h18.666M52 26.667v18.666-18.666z"
          stroke="#fff"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={6.737}
          y1={3.608}
          x2={86.681}
          y2={12.614}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#0892F9" />
          <Stop offset={1} stopColor="#87E4DB" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export const CreateTab = React.memo(SvgComponent)
