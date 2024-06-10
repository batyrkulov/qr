import React, {memo} from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

const SvgComponent = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      d="M21.738 2.083H3.75V0H2.083v2.083H0V3.75h2.083v19.167H21.25V25h1.667v-2.083H25V21.25h-2.083V3.262L25 1.179V0h-1.178l-2.084 2.083ZM20.072 3.75 3.75 20.072V3.75h16.322Zm1.178 17.5H4.929L21.25 4.929V21.25Z"
      fill="#fff"
    />
  </Svg>
)

export default memo(SvgComponent)