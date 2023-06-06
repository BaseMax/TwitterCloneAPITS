import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.otherProperty === 'value')
  bio: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((o) => o.otherProperty === 'value')
  username: string;
}
