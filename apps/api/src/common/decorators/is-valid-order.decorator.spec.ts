import { validate } from 'class-validator'
import { IsValidOrder } from './is-valid-order.decorator'

describe('IsValidOrder', () => {
  const allowedFields = ['name', 'age']
  const field = 'name'
  const direction = 'asc'

  class TestClass {
    @IsValidOrder(allowedFields)
    order: { field: string; direction: string }
  }

  it('should validate valid order', async () => {
    const instance = new TestClass()
    instance.order = { field, direction }

    const errors = await validate(instance)
    expect(errors.length).toBe(0)
  })

  it('should invalidate invalid field', async () => {
    const instance = new TestClass()
    instance.order = { field: 'invalidField', direction }
    const errors = await validate(instance)

    expect(errors.length).toBe(1)
  })

  it('should invalidate invalid direction', async () => {
    const instance = new TestClass()
    instance.order = { field, direction: 'invalidDirection' }
    const errors = await validate(instance)

    expect(errors.length).toBe(1)
  })

  it('should invalidate empty value', async () => {
    const instance = new TestClass()
    const errors = await validate(instance)

    expect(errors.length).toBe(1)
  })
})
