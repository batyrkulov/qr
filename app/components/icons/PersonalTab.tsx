import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M16 15a5 5 0 100-10 5 5 0 000 10zM9 27v-2.333A4.667 4.667 0 0113.667 20h4.666A4.667 4.667 0 0123 24.667V27"
        stroke={props.strokeColor ?? "#444F75"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const PersonalTab = React.memo(SvgComponent)
