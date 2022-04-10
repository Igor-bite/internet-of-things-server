import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export default class CreateDeviceDto {
  @ApiProperty({
    description: 'Name of the display'
  })
  @IsNotEmpty()
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