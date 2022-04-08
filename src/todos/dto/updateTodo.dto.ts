import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

enum TodoState {
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE',
}

export class UpdateTodoDto {
  @ApiProperty({
    description: 'Title of Todo'
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Description of Todo'
  })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: 'State of todo: ACTIVE/COMPLETE'
  })
  @IsOptional()
  @IsEnum({
    enum: TodoState,
    enumName: 'TodoState',
  })
  readonly state?: TodoState;
}