import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

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
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({
    description: 'Owner of Todo'
  })
  @IsOptional()
  @IsInt()
  ownerId: number;
}