import { Transform } from 'class-transformer'
import { IsValidOrder } from './is-valid-order.decorator'
import { IsOptional, ValidationOptions } from 'class-validator'
import { applyDecorators } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger'

export function OrderQuery(allowedFields: string[], validationOptions?: ValidationOptions) {
  return applyDecorators(
    ApiProperty({
      type: String,
      required: false,
      example: `${allowedFields[0]}:desc`,
      description: `Order by ${allowedFields.join(', ')}, with direction (asc or desc).`,
    }),
    IsOptional(),
    IsValidOrder(allowedFields, validationOptions),
    Transform(({ value }) => {
      if (typeof value !== 'string') return value

      const [field, direction] = value.split(':')

      return {
        field,
        direction,
      }
    }),
  )
}
