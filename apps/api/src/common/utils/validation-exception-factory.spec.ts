import { UnprocessableEntityException } from '@nestjs/common'
import { validationExceptionFactory } from './validation-exception-factory'
import { ValidationError } from 'class-validator'

describe('validationExceptionFactory', () => {
  it('should format validation errors correctly', () => {
    const errors: ValidationError[] = [
      {
        property: 'name',
        constraints: {
          isString: 'name must be a string',
          isNotEmpty: 'name should not be empty',
        },
        children: [],
      },
      {
        property: 'age',
        constraints: {
          isInt: 'age must be an integer number',
          min: 'age must not be less than 0',
        },
        children: [],
      },
    ]

    const exception = validationExceptionFactory(errors)

    expect(exception).toBeInstanceOf(UnprocessableEntityException)
    expect(exception.getResponse()).toEqual({
      name: ['name must be a string', 'name should not be empty'],
      age: ['age must be an integer number', 'age must not be less than 0'],
    })
  })
})
