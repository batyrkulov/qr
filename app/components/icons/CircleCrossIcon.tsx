import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"

const SvgComponent = (props: SvgProps) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="#FF9288" {...props}>
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0 4-10.3.1-14.2zm-4.3 11.3L12 13.4l-2.8 2.8-1.4-1.4 2.8-2.8-2.8-2.8 1.4-1.4 2.8 2.8 2.8-2.8 1.4 1.4-2.8 2.8 2.8 2.8-1.4 1.4z" />
  </Svg>
)

const Memo = memo(SvgComponent)
export default Memo
