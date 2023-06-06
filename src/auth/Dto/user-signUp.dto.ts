import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { CustomMatchPasswords } from 'src/common/password.utils';
import clientMessages from 'src/common/translation/fa';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30, { message: clientMessages.auth.usernameMaxLength })
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(8, { message: clientMessages.auth.validation.minPassword })
  @MaxLength(50, { message: clientMessages.auth.validation.maxPassword })
  password: string;

  @ApiProperty()
  @Validate(CustomMatchPasswords, ['password'])
  passwordConfirm: string;
}
