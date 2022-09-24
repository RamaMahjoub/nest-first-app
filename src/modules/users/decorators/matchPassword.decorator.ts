/* eslint-disable prettier/prettier */
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsMatchPassword', async: true })
export class IsConfirmPasswordMatchPasswordConstraint
  implements ValidatorConstraintInterface
{
  validate(
    password: any,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    const [relatedPropertyName] = validationArguments.constraints;
    const relatedValue = (validationArguments.object as any)[
      relatedPropertyName
    ];
    return password === relatedValue;
  }

  defaultMessage(): string {
    return 'the confirm password does not match password';
  }
}

export function IsMatchPassword(
  password: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, proertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: proertyName,
      options: validationOptions,
      constraints: [password],
      validator: IsConfirmPasswordMatchPasswordConstraint,
    });
  };
}
