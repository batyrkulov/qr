import * as React from "react"
import Svg, { Path,Rect, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Rect x={4.004} y={4} width={16} height={16} rx={4} fill="#51C753" />
      <Path
        d="M8.004 12l2.667 3 5.333-6"
        stroke="#fff"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const CheckboxSelectedIcon = React.memo(SvgComponent)
