import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <Path
        d="M15.335 26.708L5.89 16.692c-2.66-2.82-2.492-7.446.364-10.043 2.833-2.576 7.13-2.075 9.369 1.09l.376.533.376-.532c2.24-3.166 6.535-3.667 9.369-1.09 2.856 2.596 3.023 7.221.363 10.042l-9.442 10.016a.904.904 0 01-1.332 0z"
        stroke={props.strokeColor ?? "#444F75"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export const FavoriteTab = React.memo(SvgComponent)
