import {
  Box,
  Checkbox,
  FileInput,
  NumberInput,
  PasswordInput,
  Radio,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useMemo } from 'react'

import type { FormFieldProps } from './types'

export const FormField: React.FC<FormFieldProps> = ({
  field: { after, before, ...field },
  form,
  boxProps = {},
  index,
}) => {
  const component = useMemo(() => {
    const commonProps = {
      label: field.label,
      name: field.name,
      placeholder: field.placeholder,
      disabled: field.disabled,
      readOnly: field.readOnly,
      required: field.required,
    }

    switch (field.type) {
      case 'password':
        return (
          <PasswordInput
            {...commonProps}
            {...form.getInputProps(field.name)}
            key={form.key(field.name)}
          />
        )

      case 'checkbox':
        return (
          <Checkbox
            {...commonProps}
            {...form.getInputProps(field.name, { type: 'checkbox' })}
            key={form.key(field.name)}
          />
        )

      case 'select':
        return (
          <Select
            {...commonProps}
            {...form.getInputProps(field.name)}
            key={form.key(field.name)}
            data={field.data}
          />
        )

      case 'number':
        return (
          <NumberInput
            key={form.key(field.name)}
            {...commonProps}
            {...form.getInputProps(field.name)}
            min={field.min}
            max={field.max}
          />
        )

      case 'textarea':
        return (
          <Textarea
            key={form.key(field.name)}
            {...commonProps}
            {...form.getInputProps(field.name)}
            rows={field.rows}
          />
        )

      case 'date':
        return (
          <DatePickerInput
            key={form.key(field.name)}
            {...commonProps}
            {...form.getInputProps(field.name)}
          />
        )

      case 'file':
        return (
          <FileInput
            key={form.key(field.name)}
            {...commonProps}
            {...form.getInputProps(field.name)}
            accept={field.accept}
          />
        )

      case 'radio':
        return (
          <Radio.Group
            key={form.key(field.name)}
            {...commonProps}
            {...form.getInputProps(field.name)}
          >
            {field.options?.map((option) => (
              <Radio
                key={option.value}
                value={option.value.toString()}
                label={option.label}
                disabled={option.disabled}
              />
            ))}
          </Radio.Group>
        )

      default:
        return (
          <TextInput
            {...commonProps}
            {...form.getInputProps(field.name)}
            key={form.key(field.name)}
          />
        )
    }
  }, [field, form])

  return (
    <Box mt={index !== 0 ? 'md' : undefined} {...boxProps}>
      {before}
      {component}
      {after}
    </Box>
  )
}
