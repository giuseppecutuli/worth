import { OrderDto } from '@/common/dtos'
import { SortDirection } from '@/common/types'
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator'

/**
 * Decorator to validate the order of a field.
 * @param allowedFields - Array of allowed fields for ordering.
 * @param validationOptions - Optional validation options.
 * @returns A decorator that validates the order of a field.
 */
export function IsValidOrder(allowedFields: string[], validationOptions?: ValidationOptions): PropertyDecorator {
  return function (object: object, propertyName: string | symbol) {
    registerDecorator({
      name: 'isValidOrder',
      target: object.constructor,
      propertyName: propertyName.toString(),
      constraints: [allowedFields],
      options: validationOptions,
      validator: {
        validate(value: OrderDto, args: ValidationArguments) {
          const [fields] = args.constraints

          if (!value || typeof value !== 'object') return false

          const { field, direction } = value

          const isValidField = fields.includes(field)
          const isValidDirection = Object.values(SortDirection).includes(direction)

          return isValidField && isValidDirection
        },
        defaultMessage(args: ValidationArguments) {
          const [fields] = args.constraints
          return `Format must be "field:direction" (e.g. name:asc). Allowed fields: ${fields.join(', ')}. Directions: asc, desc.`
        },
      },
    })
  }
}
