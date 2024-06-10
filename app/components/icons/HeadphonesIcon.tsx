import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M5.838 10a1.333 1.333 0 00-2.667 0v1.333a1.333 1.333 0 002.667 0V10zM13.838 10a1.333 1.333 0 00-2.667 0v1.333a1.333 1.333 0 002.667 0V10z"
        stroke="#0892F9"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.17 10V8a5.333 5.333 0 1110.668 0v2M12.504 12.667c0 .53-.421 1.039-1.172 1.414-.75.375-1.767.586-2.828.586"
        stroke="#0892F9"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const HeadphonesIcon = React.memo(SvgComponent)
