import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from "class-validator";
import { ControlType } from "./createControl.dto";

export default class UpdateControlDto {
  @ApiProperty({
    description: 'Control type: SWITCH/BUTTON/SLIDER'
  })
  @IsOptional()
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
  @IsOptional()
  @IsInt()
  readonly projectId: number;

  @ApiProperty({
    description: 'Port of device, which control uses'
  })
  @IsOptional()
  @IsString()
  readonly port: string;

  @ApiProperty({
    description: 'Device id, which control uses'
  })
  @IsOptional()
  @IsInt()
  readonly deviceId: number;
}