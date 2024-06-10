import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M8.004 14a6 6 0 100-12 6 6 0 000 12z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.87 6a1.333 1.333 0 00-1.2-.667H7.338a1.333 1.333 0 100 2.667h1.334a1.333 1.333 0 010 2.667H7.337a1.334 1.334 0 01-1.2-.667M8.004 10.667V12m0-8v1.333V4z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const TokenIcon = React.memo(SvgComponent)
