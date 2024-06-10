import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <Path
        d="M2.67 4a1.333 1.333 0 011.334-1.333h6.667a.667.667 0 01.667.666v2s.988-.18 1.248.341S12.671 8 12.671 8V6a.666.666 0 00-.667-.667h-8A1.333 1.333 0 012.671 4zm0 0v8a1.333 1.333 0 001.334 1.333h8a.667.667 0 00.667-.666v-2"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.337 8v2.667H10.67a1.333 1.333 0 010-2.667h2.667z"
        stroke="#fff"
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const WalletIcon = React.memo(SvgComponent)
