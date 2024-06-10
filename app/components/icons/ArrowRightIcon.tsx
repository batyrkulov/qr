import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
  strokeWidth?: number
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={11} height={18} viewBox="0 0 11 18" fill="none" {...props}>
      <Path
        d="M1.004 1l8 8-8 8"
        stroke={props.strokeColor ?? "#444F75"}
        strokeWidth={props.strokeWidth ?? 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const ArrowRightIcon = React.memo(SvgComponent)
