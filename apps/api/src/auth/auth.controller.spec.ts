import { Test, TestingModule } from '@nestjs/testing'

import { User } from '@/users/entities'

import { AuthController } from './auth.controller'
import { ForgotPasswordDto, RefreshTokenDto, ResetPasswordDto, SignInDto, SignOutDto, SignUpDto } from './dtos/requests'
import { AuthService } from './services/auth.service'

describe('AuthController', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signIn: jest.fn(),
            signUp: jest.fn(),
            refreshToken: jest.fn(),
            signOut: jest.fn(),
            forgotPassword: jest.fn(),
            resetPassword: jest.fn(),
          },
        },
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
    service = module.get<AuthService>(AuthService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('Should call the service to signIn', async () => {
    const spy = jest.spyOn(service, 'signIn')

    await controller.signIn({} as SignInDto)
    expect(spy).toHaveBeenCalled()
  })

  it('Should call the service to signUp', async () => {
    const spy = jest.spyOn(service, 'signUp')

    await controller.signUp({} as SignUpDto)
    expect(spy).toHaveBeenCalled()
  })

  it('Should return user instance', () => {
    expect(controller.me({} as User)).toBeDefined()
  })

  it('Should call the service to refreshToken', async () => {
    const spy = jest.spyOn(service, 'refreshToken')

    await controller.refreshToken({} as RefreshTokenDto)
    expect(spy).toHaveBeenCalled()
  })

  it('Should call the service to signOut', async () => {
    const spy = jest.spyOn(service, 'signOut')

    await controller.signOut({} as SignOutDto, {} as User)
    expect(spy).toHaveBeenCalled()
  })

  it('Should call the service to forgotPassword', async () => {
    const spy = jest.spyOn(service, 'forgotPassword')

    await controller.forgotPassword({} as ForgotPasswordDto)
    expect(spy).toHaveBeenCalled()
  })

  it('Should call the service to resetPassword', async () => {
    const spy = jest.spyOn(service, 'resetPassword')

    await controller.resetPassword({} as ResetPasswordDto)
    expect(spy).toHaveBeenCalled()
  })
})
