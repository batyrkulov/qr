import React, { FC } from "react"
import { View } from "react-native"

import { Checkbox } from ".."
import { LABEL } from "../phoneInput/styles"
import { Text } from "../text/text"

export type CheckboxGroupProps = {
  title: string
  options: { value: string | number; label?: string }[]
  value: (string | number)[]
  onChange: (v: (string | number)[]) => void
  error: string
}

export const CheckboxGroup: FC<CheckboxGroupProps> = ({
  title,
  options,
  value,
  onChange,
  error,
}) => {
  return (
    <View>
      <Text style={LABEL} preset="fieldLabel">
        {title}
      </Text>
      <View>
        {options.map((o) => (
          <Checkbox
            key={o.value}
            onToggle={(v) =>
              v
                ? onChange([...(value || []), o.value])
                : onChange(value.filter((v) => v !== o.value))
            }
            text={o.label || o.value.toString()}
            value={value?.includes(o.value)}
          />
        ))}
      </View>
      {!!error && <Text preset="error">{error}</Text>}
    </View>
  )
}
