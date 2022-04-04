import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

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
}