import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Address } from 'nodemailer/lib/mailer';

export class SendEmailDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => Object) // se quiser validar internamente
  sender?: string | Address;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Object)
  recipients?: (Address | string)[];

  @IsString()
  subject?: string;

  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  html?: string;

  template?: string; // ex: 'validate-user'
  context?: Record<string, any>; // ex: { name, email, token, link }
}
