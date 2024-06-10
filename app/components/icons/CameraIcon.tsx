import * as React from "react"
import Svg, { ClipPath,Defs, G, Path, SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  stroke?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={17} height={16} viewBox="0 0 17 16" fill="none" {...props}>
      <G
        clipPath="url(#prefix__clip0)"
        stroke={props?.stroke ?? "#878FA3"}
        strokeWidth={1.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M2.67 14h10.667c.736 0 1.333-.597 1.333-1.333V5.733c0-.736-.597-1.333-1.333-1.333h-2L9.67 2H6.337L4.67 4.4h-2c-.736 0-1.333.597-1.333 1.333v6.934c0 .736.597 1.333 1.333 1.333z" />
        <Path d="M8.004 11.333a2.667 2.667 0 100-5.333 2.667 2.667 0 000 5.333z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(.004)" d="M0 0h16v16H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const CameraIcon = React.memo(SvgComponent)
