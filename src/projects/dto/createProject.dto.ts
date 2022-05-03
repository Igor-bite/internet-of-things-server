import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title of the project'
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Owner of the project'
  })
  @IsOptional()
  @IsInt()
  ownerId: number;

  @ApiProperty({
    description: 'Url for background image of the project'
  })
  @IsOptional()
  @IsUrl()
  readonly backgroundImageUrl?: string;
}