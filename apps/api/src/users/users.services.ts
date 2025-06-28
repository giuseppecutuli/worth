import { ForbiddenException, Injectable, UnprocessableEntityException } from '@nestjs/common'

import { PasswordService } from '@/auth/services/password.service'
import { PrismaService } from '@/prisma/prisma.service'

import { UpdateUserDto } from './dtos/requests'
import { User } from './entities'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Update user
   *
   * @param id - User ID
   * @param body - User data
   * @param user - User
   * @returns Updated user
   */
  async update(id: string, body: UpdateUserDto, user: User): Promise<User> {
    if (id !== user.id) {
      throw new ForbiddenException('You can only update your own user profile.')
    }

    if (
      body.current_password &&
      !(await PasswordService.validatePassword(body.current_password, user.password))
    ) {
      throw new UnprocessableEntityException('Current password is incorrect.')
    }

    const updateData: Partial<User> = {
      first_name: body.first_name,
      last_name: body.last_name,
      password: body.new_password
        ? await PasswordService.hashPassword(body.new_password)
        : undefined,
    }

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    })
  }

  /**
   * Delete user
   *
   * @param id - User ID
   * @param user - User
   * @returns Deleted user
   */
  async delete(id: string, user: any): Promise<void> {
    if (id !== user.id) {
      throw new ForbiddenException('You can only update your own user profile.')
    }
    // Implement the logic to delete a user
    // This is just a placeholder implementation
  }
}
