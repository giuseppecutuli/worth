import { Injectable, Logger } from '@nestjs/common'
import { PrismaService } from '@prisma/prisma.service'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

type Options = {
  entity: string
  field: string
}

@ValidatorConstraint({ name: 'ExistOnDb', async: true })
@Injectable()
export class PrismaExistValidator implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: string | number | string[] | number[], args: ValidationArguments): Promise<boolean> {
    const [property] = args.constraints
    const { entity, field } = property as Options

    if (this.prisma[entity]) {
      throw new Error(`entity ${entity} does not exist on the database.`)
    }

    try {
      const rows = await this.prisma[entity].findMany({
        where: {
          [field]: Array.isArray(value) ? { in: value } : value,
        },
      })

      if (!rows.length || (Array.isArray(value) && rows.length !== value.length)) {
        return false
      }

      return true
    } catch (e) {
      Logger.error(e)

      return false
    }
  }

  defaultMessage(args: ValidationArguments): string {
    const [property] = args.constraints
    const { entity, field } = property as Options

    return `entity ${entity} with the ${field} provided does not exist on the database.`
  }
}

export const ExistOnDb = (options: Options, validationOptions?: ValidationOptions) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: PrismaExistValidator,
    })
  }
}
