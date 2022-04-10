import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { TodoState } from "@prisma/client";

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
  @IsEnum(TodoState)
  readonly state?: TodoState;
}