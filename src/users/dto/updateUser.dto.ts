import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { SubscriptionPlan } from "./createUser.dto";

export default class UpdateUserDto {
  @ApiProperty({
    description: 'User\'s email'
  })
  @IsOptional()
  @IsString()
  readonly email?: string;

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