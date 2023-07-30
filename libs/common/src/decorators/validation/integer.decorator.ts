import {
  isPositive,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { isInteger } from 'lodash';

export function IsPositiveInteger(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isPositiveInteger',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate: (value: any): boolean =>
          isInteger(+value) && isPositive(+value),
        defaultMessage: (validationArguments?: ValidationArguments): string =>
          `${validationArguments.property} 는 0 보다 커야 합니다`,
      },
    });
  };
}
