import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsOptional, IsString } from "class-validator";

export default class UpdateDeviceDto {
  @ApiProperty({
    description: 'Name of the device'
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Microcontroller name'
  })
  @IsOptional()
  @IsString()
  readonly microcontrollerName?: string;

  @ApiProperty({
    description: 'Number of seconds, after which server notifies owner of device, which went offline'
  })
  @IsOptional()
  @IsInt()
  readonly notifyAfter?: number;
}