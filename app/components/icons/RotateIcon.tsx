import React, { memo } from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg width={26} height={27} {...props}>
    <Path
      d="m14.91 24.82.35 2a12.9 12.9 0 0 0 4.24-1.54l-1-1.73a10.88 10.88 0 0 1-3.59 1.27Zm6.51-3.75L23 22.35a13 13 0 0 0 2.24-3.91l-1.87-.68a11 11 0 0 1-1.95 3.31ZM6.5 25.25a12.9 12.9 0 0 0 4.24 1.54l.35-2a10.878 10.878 0 0 1-3.59-1.3l-1 1.76Zm-3.83-7.49-1.87.68A13 13 0 0 0 3 22.35l.32-.26 1.22-1a11 11 0 0 1-1.91-3.31l.04-.02ZM26 14a12.852 12.852 0 0 0-.8-4.44l-1.87.68A11.18 11.18 0 0 1 24 14h2Zm-3-8.35a13 13 0 0 0-20 0V2H1v8h8V8H3.81a11 11 0 0 1 17.61-1.07L23 5.65Z"
      fill="#fff"
    />
  </Svg>
)

export default memo(SvgComponent)
