import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title of the project'
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Url for background image of the project'
  })
  @IsOptional()
  @IsUrl()
  readonly backgroundImageUrl?: string;
}