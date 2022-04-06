import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export enum SubscriptionPlan {
  NONE = 'NONE',
  PREMIUM = 'PREMIUM',
  PREMIUM_PRO = 'PREMIUM_PRO',
  PREMIUM_PRO_PLUS = 'PREMIUM_PRO_PLUS',
}

export default class CreateUserDto {
  @ApiProperty({
    description: 'User\'s email'
  })
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty({
    description: 'User\'s name'
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({
    description: 'User\'s surname'
  })
  @IsOptional()
  @IsString()
  readonly surname?: string;

  @ApiProperty({
    description: 'Subscription Plan'
  })
  @IsOptional()
  @IsEnum({
    enum: SubscriptionPlan,
    enumName: 'SubscriptionPlan',
  })
  readonly subscriptionPlan: SubscriptionPlan;
}