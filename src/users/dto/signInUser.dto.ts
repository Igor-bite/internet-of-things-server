import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class SignInUserDto {
  @ApiProperty({
    description: 'Email'
  })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Password'
  })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

