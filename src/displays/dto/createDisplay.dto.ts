import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class CreateDisplayDto {
  @ApiProperty({
    description: 'Title of the display'
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Initial value'
  })
  @IsOptional()
  @IsNumber()
  readonly value?: number;

  @ApiProperty({
    description: 'Interval of display updates'
  })
  @IsOptional()
  @IsInt()
  readonly updateInterval?: number;

  @ApiProperty({
    description: 'Project id, in which display exists'
  })
  @IsNotEmpty()
  @IsInt()
  readonly projectId: number;

  @ApiProperty({
    description: 'Port of device, which display uses'
  })
  @IsNotEmpty()
  @IsString()
  readonly port: string;

  @ApiProperty({
    description: 'Device id, which display uses'
  })
  @IsNotEmpty()
  @IsInt()
  readonly deviceId: number;
}