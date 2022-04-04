import { ApiProperty, ApiTags } from "@nestjs/swagger";
import { IsDefined, IsString } from "class-validator";

export class CreateProjectDto {
  @ApiProperty({
    description: 'Title of the project'
  })
  @IsDefined()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Url for background image of the project'
  })
  @IsString()
  readonly backgroundImageUrl?: string;
}