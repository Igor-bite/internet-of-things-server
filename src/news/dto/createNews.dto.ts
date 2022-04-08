import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateNewsDto {
  @ApiProperty({
    description: 'Title of the news post'
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Main text of the news post'
  })
  @IsNotEmpty()
  @IsString()
  readonly text: string;
}