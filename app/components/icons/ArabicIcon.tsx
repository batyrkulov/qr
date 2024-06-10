import * as React from "react"
import Svg, { Path,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={16} height={10} viewBox="0 0 16 10" fill="none" {...props}>
      <Path
        d="M13.822 8.25l-.797-.727.797-.728.797.728-.797.727zm-.15-3.75c.026.463.21 1.115.016 1.563l.586-.806c-.015.019-.03.038-.043.058l.2-.262c-.594.497-2.041.373-2.77.381a64.512 64.512 0 01-4.017-.064c-.262.356-.523.68-.784 1.036.748-.772 1.431-1.601 2.548-1.933.912-.271 1.934.37 1.487 1.266l.77-1.05c-.777.938-2.432.61-3.542.662-1.227.059-1.757-.25-1.763-1.499L5.575 4.92c.044.79.066 1.577-.133 2.353-.047.182-.077.348-.158.518.344-.718.36-.5-.04-.225-.425.292-.995.405-1.516.408-1.833.013-2.303-2.238-1.593-3.408-.226.372-.558.693-.785 1.067-1.184 1.952.832 4.279 3.109 3.001.645-.362 1.062-1.158 1.455-1.724.605-.873.5-2.076.446-3.058.017.31-.678.752-.785 1.068-.528 1.553.905 1.513 2.165 1.484 1.283-.03 2.551.152 3.354-.927.508-.682 1.203-1.56.029-2.08-1.333-.59-2.775 1.245-3.48 1.972-.132.137-.642 1.044-.783 1.037 1.157.059 2.316.057 3.474.09 1.015.03 2.11.02 3.089-.252.42-.117.723-.789.94-1.09.343-.478.124-1.186.095-1.721.018.337-.805.719-.785 1.067zm1.367-2.45c.174 1.542.152 3.142.14 4.691.003-.346.811-.693.814-1.05.01-1.55.033-3.149-.141-4.691.036.315-.85.723-.813 1.05z"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.4}
      />
    </Svg>
  )
}

export const ArabicIcon = React.memo(SvgComponent)
