import * as React from "react"
import Svg, { Circle, Path, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={171} height={171} viewBox="0 0 171 171" fill="none" {...props}>
      <Path
        d="M115.427 111.149a4.277 4.277 0 00-3.023 7.298 4.276 4.276 0 003.023 1.252h17.1a4.272 4.272 0 004.275-4.275 4.273 4.273 0 00-4.275-4.275h-17.1z"
        fill="#62C4C3"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.358 40.46a21.375 21.375 0 00-6.26 15.115v50.568a26.933 26.933 0 018.55-6.084V76.95h119.7v38.475a12.826 12.826 0 01-12.825 12.825H63.264a26.68 26.68 0 01-2.682 8.55h71.941a21.377 21.377 0 0021.375-21.375v-59.85A21.374 21.374 0 00132.523 34.2h-94.05a21.375 21.375 0 00-15.115 6.26zm118.233 6.047a12.826 12.826 0 013.757 9.068V68.4h-119.7V55.575A12.825 12.825 0 0138.473 42.75h94.05c3.401 0 6.663 1.351 9.068 3.757z"
        fill="#62C4C3"
      />
      <Circle cx={36.0327} cy={125.197} r={23.8179} fill="#62C4C3" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M39.037 108.707h-4.79l.383 21.698h4.024l.383-21.698zm.048 26.871h-4.886v6.084h4.886v-6.084z"
        fill="#fff"
      />
    </Svg>
  )
}

export const PaymentFailIcon = React.memo(SvgComponent)
