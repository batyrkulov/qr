import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      {...props}
    >
      <Path
        d="M10.004 12.667a2.667 2.667 0 100-5.334 2.667 2.667 0 000 5.334zM12.337 12.333L14.004 14M2.67 4h10.668M2.67 8h2.668M2.67 12h2.668"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const Listing = React.memo(SvgComponent)
