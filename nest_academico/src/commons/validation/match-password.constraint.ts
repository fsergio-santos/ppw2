import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'MatchPassword', async: false })
export class MatchPasswordConstraint implements ValidatorConstraintInterface {
  validate(confirmSenha: string, args: ValidationArguments) {
    const object = args.object as any;
    return object.senha === confirmSenha;
  }

  defaultMessage(): string {
    return 'As senhas não coincidem.';
  }
}
