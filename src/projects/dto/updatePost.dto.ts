import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl } from "class-validator";

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Title of the project'
  })
  @IsOptional()
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Url for background image of the project'
  })
  @IsOptional()
  @IsUrl()
  readonly backgroundImageUrl?: string;
}