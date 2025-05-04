import { OrderQuery } from './order-query.decorator'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { OrderDto } from '../dtos'

describe('OrderQuery Decorator', () => {
  class TestDto {
    @OrderQuery(['name', 'age'])
    order: OrderDto
  }

  it('should transform valid order string to object', async () => {
    const dto = plainToInstance(TestDto, { order: 'name:desc' })
    const errors = await validate(dto)

    expect(errors).toHaveLength(0)
    expect(dto.order).toEqual({ field: 'name', direction: 'desc' })
  })

  it('should accept valid field with asc direction', async () => {
    const dto = plainToInstance(TestDto, { order: 'age:asc' })
    const errors = await validate(dto)

    expect(errors).toHaveLength(0)
    expect(dto.order).toEqual({ field: 'age', direction: 'asc' })
  })

  it('should return validation error for invalid field', async () => {
    const dto = plainToInstance(TestDto, { order: 'invalid:desc' })
    const errors = await validate(dto)

    expect(errors).toHaveLength(1)
  })

  it('should return validation error for invalid direction', async () => {
    const dto = plainToInstance(TestDto, { order: 'name:invalid' })
    const errors = await validate(dto)

    expect(errors).toHaveLength(1)
  })

  it('should handle missing order parameter', async () => {
    const dto = plainToInstance(TestDto, {})
    const errors = await validate(dto)

    expect(errors).toHaveLength(0)
    expect(dto.order).toBeUndefined()
  })

  it('should return validation error for malformed order string', async () => {
    const dto = plainToInstance(TestDto, { order: 'malformed' })
    const errors = await validate(dto)

    expect(errors).toHaveLength(1)
  })

  it('should preserve non-string values', async () => {
    const originalValue = { field: 'name', direction: 'desc' as const }
    const dto = plainToInstance(TestDto, { order: originalValue })
    const errors = await validate(dto)

    expect(errors).toHaveLength(0)
    expect(dto.order).toEqual(originalValue)
  })
})
