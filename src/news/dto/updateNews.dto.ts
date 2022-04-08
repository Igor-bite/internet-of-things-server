import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateNewsDto {
  @ApiProperty({
    description: 'Title of the news post'
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Main text of the news post'
  })
  @IsOptional()
  @IsString()
  readonly text?: string;
}