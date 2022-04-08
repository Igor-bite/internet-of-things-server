import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export default class UpdateDeviceDto {
  @ApiProperty({
    description: 'Name of the display'
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Microco'
  })
  @IsOptional()
  @IsString()
  readonly microcontrollerName?: string;

  @ApiProperty({
    description: 'Initial value'
  })
  @IsOptional()
  @IsDate()
  readonly lastSeen?: Date;

  @ApiProperty({
    description: 'Minimum value'
  })
  @IsOptional()
  @IsInt()
  readonly notifyAfter?: number;
}