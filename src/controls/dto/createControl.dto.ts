import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

enum ControlType {
  SWITCH = 'SWITCH',
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
}

export default class CreateControlDto {
  @ApiProperty({
    description: 'Control type: SWITCH/BUTTON/SLIDER'
  })
  @IsNotEmpty()
  @IsEnum({
    enum: ControlType,
    enumName: 'ControlType',
  })
  readonly type: ControlType;

  @ApiProperty({
    description: 'Title of the control'
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
    description: 'Minimum value'
  })
  @IsOptional()
  @IsNumber()
  readonly minValue?: number;

  @ApiProperty({
    description: 'Maximum value'
  })
  @IsOptional()
  @IsNumber()
  readonly maxValue?: number;

  @ApiProperty({
    description: 'Project id, in which control exists'
  })
  @IsNotEmpty()
  @IsInt()
  readonly projectId: number;

  @ApiProperty({
    description: 'Port of device, which control uses'
  })
  @IsNotEmpty()
  @IsString()
  readonly port: string;

  @ApiProperty({
    description: 'Device id, which control uses'
  })
  @IsNotEmpty()
  @IsInt()
  readonly deviceId: number;
}