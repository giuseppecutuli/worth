import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants'

import { User } from '@/users/entities'

import { UseUser } from './user.decorator'

function getParamDecoratorFactory(Decorator: any) {
  class TestDecorator {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public test(@Decorator() value) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, TestDecorator, 'test')
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return args[Object.keys(args)[0] as string].factory
}

describe('User decorator', () => {
  it('Should return the user', () => {
    const user = {
      id: 'id',
    } as User

    const request = {
      user,
    }

    const getRequest = jest.fn().mockReturnValue(request)
    const switchToHttp = jest.fn().mockReturnValue({ getRequest })
    const ctx = {
      switchToHttp,
    }

    const factory = getParamDecoratorFactory(UseUser)
    const data = factory({}, ctx)

    expect(data).toStrictEqual(user)
  })
})
