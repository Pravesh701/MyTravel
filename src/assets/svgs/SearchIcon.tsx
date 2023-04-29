import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchIcon(props: any) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 7.927C0 3.557 3.556 0 7.927 0c4.37 0 7.927 3.556 7.927 7.927a7.891 7.891 0 01-1.83 5.062l3.762 3.762a.732.732 0 11-1.035 1.035l-3.763-3.763a7.891 7.891 0 01-5.061 1.83C3.557 15.854 0 12.299 0 7.928zm1.463 0a6.47 6.47 0 006.464 6.463 6.47 6.47 0 006.463-6.463 6.47 6.47 0 00-6.463-6.464 6.47 6.47 0 00-6.464 6.464z"
        fill="#000"
        fillOpacity={0.7}
      />
    </Svg>
  )
}

export default SearchIcon;
