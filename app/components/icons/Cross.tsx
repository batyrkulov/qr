import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg viewBox="0 0 256 256" {...props}>
      <Path fill="none" d="M0 0h256v256H0z" />
      <Path
        fill="none"
        stroke={props.color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={24}
        d="M200 56L56 200M200 200L56 56"
      />
    </Svg>
  )
}

export const Cross = React.memo(SvgComponent)
