import React, { FC, useRef } from "react"
import { I18nManager, Platform, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"

import { MARGIN_BOTTOM } from "../../common_styles"
import { MARGIN_RIGHT } from "../../screens/PostYourListing/ExtraInformation/styles"
import { LABEL } from "../phoneInput/styles"
import { SelectButton } from "../select-button"
import { Text } from "../text/text"
import { FIXED, FULL_WIDTH, OPTIONS, SCROLL, SUBTITLE } from "./styles"

export type SelectButtonOption = { value: string | number; label?: string; image_url?: string }

export type SelectButtonGroupProps = {
  title?: string
  options: SelectButtonOption[]
  value: (string | number)[] | (string | number)
  onChange: (v: (string | number)[] | string | number) => void
  multiple?: boolean
  preset?: "scroll" | "fixed"
  error?: string
  withAllOption?: boolean
  fullWidth?: boolean
  subtitle?: string
}

export const SelectButtonGroup: FC<SelectButtonGroupProps> = ({
  onChange,
  options,
  title,
  subtitle,
  value,
  multiple,
  preset = "fixed",
  error,
  fullWidth,
  withAllOption,
}) => {
  const scroll = useRef<ScrollView>()
  const scrollListToStart = (contentWidth) => {
    if (I18nManager.isRTL && Platform.OS === "android") {
      scroll.current.scrollTo({ x: contentWidth, animated: false })
    }
  }
  return (
    <View>
      {!!title && (
        <Text style={LABEL} preset="fieldLabel">
          {title}
          {subtitle && (
            <Text style={SUBTITLE} preset="input">
              {subtitle}
            </Text>
          )}
        </Text>
      )}
      {preset === "scroll" ? (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={scrollListToStart}
          ref={scroll}
          style={SCROLL}
          horizontal
        >
          <View style={fullWidth ? FULL_WIDTH : OPTIONS}>
            {multiple && Array.isArray(value) ? (
              <>
                {withAllOption && (
                  <View key={0} style={MARGIN_RIGHT(10)}>
                    <SelectButton
                      onSelect={() => onChange([])}
                      text="All"
                      active={!value.length || value.length === options.length}
                    />
                  </View>
                )}
                {options.map((o) => (
                  <View key={o.value} style={MARGIN_RIGHT(10)}>
                    <SelectButton
                      icon={o.image_url}
                      onSelect={(v) =>
                        !v
                          ? onChange([...value, o.value])
                          : onChange(value.filter((v) => v !== o.value))
                      }
                      text={o.label || o.label}
                      active={!!value?.find((v) => o.value === v)}
                    />
                  </View>
                ))}
              </>
            ) : (
              options.map((o) => (
                <View key={o.value} style={MARGIN_RIGHT(10)}>
                  <SelectButton
                    icon={o.image_url}
                    onSelect={(v) => (!v ? onChange(o.value) : onChange(null))}
                    text={o.label}
                    active={!Array.isArray(value) && value === o.value}
                  />
                </View>
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={[OPTIONS, FIXED]}>
          {multiple && Array.isArray(value)
            ? options.map((o) => (
                <View key={o.value} style={[MARGIN_BOTTOM(8), MARGIN_RIGHT(8)]}>
                  <SelectButton
                    icon={o.image_url}
                    onSelect={(v) =>
                      !v
                        ? onChange([...value, o.value])
                        : onChange(value.filter((v) => v !== o.value))
                    }
                    text={o.label}
                    active={!!value?.find((v) => o.value === v)}
                  />
                </View>
              ))
            : options.map((o) => (
                <View key={o.value} style={[MARGIN_BOTTOM(8), MARGIN_RIGHT(8)]}>
                  <SelectButton
                    icon={o.image_url}
                    key={o.value}
                    onSelect={(v) => (!v ? onChange(o.value) : onChange(null))}
                    text={o.label}
                    active={!Array.isArray(value) && value === o.value}
                  />
                </View>
              ))}
        </View>
      )}
      {!!error && <Text preset="error">{error}</Text>}
    </View>
  )
}
