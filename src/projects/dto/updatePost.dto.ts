import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateProjectDto {
  @ApiProperty({
    description: 'Title of the project'
  })
  @IsString()
  readonly title?: string;

  @ApiProperty({
    description: 'Url for background image of the project'
  })
  @IsString()
  readonly backgroundImageUrl?: string;
}