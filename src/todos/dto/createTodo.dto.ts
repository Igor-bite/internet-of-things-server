import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateTodoDto {
  @ApiProperty({
    description: 'Title of Todo'
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Description of Todo'
  })
  @IsString()
  readonly description?: string;
}