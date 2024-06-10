import React, { FC, useCallback, useEffect, useState } from "react"
import { View } from "react-native"
import Slider from "rn-range-slider"

import { FLEX, MARGIN_BOTTOM, ROW } from "../../common_styles"
import { Input } from "../input"
import { Text } from "../text/text"
import { RAIL, RAIL_SELECTED, SPACER, THUMB } from "./styles"

const Rail = () => {
  return <View style={RAIL} />
}
const RailSelected = () => {
  return <View style={RAIL_SELECTED} />
}

const Thumb = () => {
  return <View style={THUMB} />
}

const Notch = (props) => {
  return <View style={RAIL} {...props} />
}

type RangeSliderProps = {
  onChange: (v: string) => void
  label: string
  range_min: number
  range_max: number
}

export const RangeSlider: FC<RangeSliderProps> = ({ onChange, label, range_max, range_min }) => {
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderNotch = useCallback(() => <Notch />, [])
  const [low, setLow] = useState(range_min)
  const [high, setHigh] = useState(range_max)
  const handleValueChange = useCallback((low, high) => {
    setLow(low)
    setHigh(high)
  }, [])

  useEffect(() => {
    onChange(`${low},${high}`)
  }, [onChange, low, high])

  return (
    <View>
      <Text preset="fieldLabel" style={MARGIN_BOTTOM(10)}>
        {label}
      </Text>
      <View style={[ROW, MARGIN_BOTTOM(20)]}>
        <Input
          noLabel
          value={`${low}`}
          style={FLEX(1)}
          onChangeText={(v) => setLow(+v)}
          placeholder="From"
          keyboardType="numeric"
        />
        <View style={SPACER} />
        <Input
          noLabel
          onChangeText={(v) => setHigh(+v)}
          style={FLEX(1)}
          value={`${high}`}
          placeholder="To"
          keyboardType="numeric"
        />
      </View>
      <Slider
        min={range_min || 0}
        max={range_max || 1000000}
        step={1}
        floatingLabel
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        renderNotch={renderNotch}
        onValueChanged={handleValueChange}
      />
    </View>
  )
}
