import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M4.004 12h11M8.004 7l-5 5 5 5M21.004 3v18"
        stroke="#444F75"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const LogOutIcon = React.memo(SvgComponent)
