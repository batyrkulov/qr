import React, { FC } from "react"
import { Control, Controller } from "react-hook-form"

import { Block, ExtraInformationBlockTypeEnum } from "../../api/post"
import { ROW_CHILD } from "../../screens/PostYourListing/ExtraInformation/styles"
import { RangeSlider, SelectButtonGroup } from ".."
import { CheckboxGroup } from "../checkbox-group"
import { Input } from "../input"
import { Picker } from "../picker"

type DynamicFilterOptionProps = {
  block: Block
  control: Control
  not_required?: boolean
}
const now = new Date().getUTCFullYear() + 1
const years = Array(now - 1950)
  .fill("")
  .map((__, i) => i + 1950)
  .reverse()

export const DynamicFilterOption: FC<DynamicFilterOptionProps> = ({
  block,
  control,
  not_required,
}) => {
  switch (block.block.block_type.name) {
    case ExtraInformationBlockTypeEnum.SELECT:
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => {
            return (
              <Picker
                label={block.block.block_description.name + (block.block.is_required ? '*' : '')}
                placeholder={block.block.block_description.name}
                onChange={(v) => onChange(v)}
                value={value?.label}
                preselected={value}
                error={errors[block.block.slug]}
                modalTitle={block.block.block_description.name}
                items={block.block.item.map((opt) => ({
                  label: opt.item_description.name || opt.id.toString(),
                  value: opt.id,
                }))}
              />
            )
          }}
        />
      )
    case ExtraInformationBlockTypeEnum.YEAR:
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => {
            return (
              <Picker
                label={block.block.block_description.name + (block.block.is_required ? '*' : '')}
                placeholder={block.block.block_description.name}
                onChange={(v) => onChange(v)}
                value={value?.label}
                preselected={value}
                error={errors[block.block.slug]}
                modalTitle={block.block.block_description.name}
                items={years.map((year) => ({
                  label: year.toString(),
                  value: year,
                }))}
              />
            )
          }}
        />
      )
    case ExtraInformationBlockTypeEnum.INPUT:
      return (
        <Controller
          key={block.id}
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Input
              error={errors[block.block.slug]?.message}
              style={ROW_CHILD}
              label={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              placeholder={block.block.block_description.name}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
      )
    case ExtraInformationBlockTypeEnum.INPUT_NUMBER:
      return (
        <Controller
          key={block.id}
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <Input
              error={errors[block.block.slug]?.message}
              style={ROW_CHILD}
              label={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              placeholder={block.block.block_description.name}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
        />
      )
    case ExtraInformationBlockTypeEnum.CHECKBOX:
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <CheckboxGroup
              options={block.block.item.map((opt) => ({
                label: opt.item_description.name,
                value: opt.id,
              }))}
              error={errors[block.block.slug]?.message}
              title={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              value={value}
              onChange={onChange}
            />
          )}
        />
      )
    case ExtraInformationBlockTypeEnum.RADIO:
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <SelectButtonGroup
              value={value}
              onChange={onChange}
              error={errors[block.block.slug]?.message}
              options={block.block.item.map((opt) => ({
                label: opt.item_description.name,
                value: opt.id,
                image_url: opt.image_url,
              }))}
              title={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              preset="scroll"
            />
          )}
        />
      )
    case ExtraInformationBlockTypeEnum.CHECKBOX_WITH_PICTURES:
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange, value }, formState: { errors } }) => (
            <SelectButtonGroup
              value={value || []}
              onChange={onChange}
              error={errors[block.block.slug]?.message}
              options={block.block.item.map((opt) => ({
                label: opt.item_description.name,
                value: opt.id,
                image_url: opt.image_url,
              }))}
              title={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              multiple
              preset="scroll"
            />
          )}
        />
      )
    case ExtraInformationBlockTypeEnum.RANGE:
      
      return (
        <Controller
          control={control}
          name={block.block.slug}
          rules={{
            required: {
              value: !not_required && block.block.is_required,
              message: "This feild is mandatory **",
            },
          }}
          render={({ field: { onChange } }) => (
            <RangeSlider
              range_max={block.block.range_max}
              range_min={block.block.range_min}
              label={block.block.block_description.name + (block.block.is_required ? '*' : '')}
              onChange={onChange}
            />
          )}
        />
      )
    default:
      return null
  }
}
