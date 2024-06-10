import * as React from "react"
import Svg, { Rect,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Rect
        x={4.704}
        y={4.7}
        width={14.6}
        height={14.6}
        rx={3.3}
        fill="#F9FCFF"
        stroke="#878FA3"
        strokeWidth={1.4}
      />
    </Svg>
  )
}

export const CheckboxUnselectedIcon = React.memo(SvgComponent)
