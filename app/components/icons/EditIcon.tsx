import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M2.004 14h12M3.004 9L9.67 2.333a1.414 1.414 0 112 2L5.004 11l-2.667.667L3.004 9z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const EditIcon = React.memo(SvgComponent)
