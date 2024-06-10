import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M4 6.667v21.057c0 .594.718.891 1.138.471l5.138-5.138c.25-.25.59-.39.943-.39h14.115A2.667 2.667 0 0028 20V6.667A2.667 2.667 0 0025.334 4H6.666A2.667 2.667 0 004 6.667z"
        stroke={props.strokeColor ?? "#444F75"}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const MessengerTab = React.memo(SvgComponent)
