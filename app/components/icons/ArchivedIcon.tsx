import * as React from "react"
import Svg, { Defs, LinearGradient, Path, Stop,SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={62} height={20} viewBox="0 0 62 20" fill="none" {...props}>
      <Path
        d="M.004 4a4 4 0 014-4h53a4 4 0 014 4v12a4 4 0 01-4 4h-53a4 4 0 01-4-4V4z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M16.384 12.39h-2.78l-.43 1.61h-.95l1.78-6.88h1.98l1.78 6.88h-.95l-.43-1.61zm-2.58-.85h2.38l-.93-3.61h-.52l-.93 3.61zM18.67 9h.92v.63c.593-.38 1.18-.627 1.76-.74v.94a7.04 7.04 0 00-.81.22c-.28.093-.514.183-.7.27l-.24.11V14h-.93V9zm5.266 5.11c-.493 0-.89-.09-1.19-.27-.293-.18-.506-.46-.64-.84-.126-.38-.19-.88-.19-1.5 0-.827.144-1.467.43-1.92.294-.46.82-.69 1.58-.69.194 0 .4.013.62.04.22.02.517.067.89.14l-.03.74c-.566-.053-.966-.08-1.2-.08-.353 0-.626.053-.82.16-.193.107-.33.287-.41.54-.073.253-.11.613-.11 1.08 0 .453.037.803.11 1.05.08.247.217.427.41.54.194.113.477.17.85.17l1.18-.09.03.76c-.666.113-1.17.17-1.51.17zm2.595-7.23h.93v2.39c.287-.133.547-.23.78-.29.233-.06.473-.09.72-.09.427 0 .76.083 1 .25.24.16.41.417.51.77.1.353.15.83.15 1.43V14h-.93v-2.64c0-.433-.027-.763-.08-.99-.053-.227-.153-.39-.3-.49-.14-.1-.347-.15-.62-.15-.34 0-.694.063-1.06.19l-.17.06V14h-.93V6.88zM31.952 9h.93v5h-.93V9zm0-1.99h.92v1.01h-.92V7.01zM33.786 9h.98l1.06 4.2h.34l1.1-4.2h.95l-1.34 5h-1.75l-1.34-5zm7.156 5.11c-.767 0-1.314-.197-1.64-.59-.327-.4-.49-1.03-.49-1.89 0-.927.173-1.613.52-2.06.353-.453.896-.68 1.63-.68 1.36 0 2.04.773 2.04 2.32l-.06.68h-3.19c.006.36.053.64.14.84a.808.808 0 00.42.42c.193.087.466.13.82.13.206 0 .44-.003.7-.01.26-.013.493-.03.7-.05l.28-.03.02.72c-.78.133-1.41.2-1.89.2zm1.13-2.95c0-.54-.087-.923-.26-1.15-.167-.227-.45-.34-.85-.34-.42 0-.727.12-.92.36-.194.233-.294.61-.3 1.13h2.33zm3.618 2.95c-.647 0-1.11-.207-1.39-.62-.28-.42-.42-1.057-.42-1.91 0-.947.167-1.63.5-2.05.333-.427.867-.64 1.6-.64.353 0 .743.047 1.17.14V6.88h.93V14h-.93v-.3c-.52.273-1.007.41-1.46.41zm.19-.84c.16 0 .343-.023.55-.07.207-.047.387-.1.54-.16l.18-.07V9.82a5.713 5.713 0 00-1.06-.12c-.46 0-.783.14-.97.42-.187.28-.28.75-.28 1.41 0 .6.077 1.04.23 1.32.16.28.43.42.81.42z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={-18.801}
          y1={-1.569}
          x2={60.075}
          y2={25.533}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#FF6B6C" />
          <Stop offset={1} stopColor="#FF6B6C" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export const ArchivedIcon = React.memo(SvgComponent)
