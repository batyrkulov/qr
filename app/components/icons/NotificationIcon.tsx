import * as React from "react"
import Svg, { Circle,Path, SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  isDot?: boolean
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={25} height={24} viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M5.604 9.458V8.4a6.4 6.4 0 0112.8 0v1.058c0 2.3.665 4.552 1.915 6.483L21.003 17h-18l.685-1.06a11.933 11.933 0 001.915-6.482zM11.004 20.889a1.345 1.345 0 002 0"
        stroke="#444F75"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {props.isDot && <Circle cx={17.004} cy={4} r={4} fill="#62C4C3" />}
    </Svg>
  )
}

export const NotificationIcon = React.memo(SvgComponent)
