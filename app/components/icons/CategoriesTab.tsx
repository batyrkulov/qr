import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

interface SvgPropsMore extends SvgProps {
  strokeColor?: string
}

function SvgComponent(props: SvgPropsMore) {
  return (
    <Svg width={37} height={38} viewBox="0 0 37 38" fill="none">
      <Path
        d="M17.266 6.485a2.02 2.02 0 012.767 0l9.756 9.176c.604.567.945 1.359.945 2.184v11.162c0 .797-.318 1.562-.885 2.126a3.03 3.03 0 01-2.136.88h-4.029a3.034 3.034 0 01-2.137-.881 3.005 3.005 0 01-.884-2.127v-5.01a1 1 0 00-.295-.708 1.01 1.01 0 00-.712-.294h-2.014a1.01 1.01 0 00-.712.294 1 1 0 00-.295.708v5.01c0 .797-.318 1.562-.885 2.126a3.03 3.03 0 01-2.136.88H9.586c-.802 0-1.57-.317-2.137-.88a2.998 2.998 0 01-.884-2.126V17.843c0-.825.342-1.617.946-2.184l9.755-9.178v.004zm1.383 1.455l-9.756 9.178a1.002 1.002 0 00-.314.725v11.162a1 1 0 00.295.709c.189.188.445.293.712.293h4.028a1 1 0 001.007-1.002v-5.01c0-.797.318-1.561.885-2.125a3.029 3.029 0 012.136-.88h2.014c.802 0 1.57.316 2.137.88.566.564.884 1.328.884 2.125v5.01a1 1 0 00.295.709c.19.188.445.293.712.293h4.029a1 1 0 001.007-1.002V17.843a.997.997 0 00-.314-.727L18.649 7.94z"
        fill="#444F75"
        stroke={props.strokeColor ?? "#444F75"}
      />
    </Svg>
  )
}

export const CategoriesTab = React.memo(SvgComponent)
