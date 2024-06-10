import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={12} height={12} viewBox="0 0 12 12" fill="none" {...props}>
      <Path
        d="M8.666 8.667l2.667 2.666-2.667-2.666zm1.333-3.334a4.667 4.667 0 11-9.333 0 4.667 4.667 0 019.333 0z"
        stroke="#0892F9"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const SearchIcon = React.memo(SvgComponent)
