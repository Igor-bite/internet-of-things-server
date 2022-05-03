import { Get, Post, Delete, Param, Body, Controller, Put } from "@nestjs/common";
import { SupertokenUserId, UserFromSupertokenId } from'../decorators/user.decorator';
import DisplaysService from "./displays.service";
import CreateDisplayDto from "./dto/createDisplay.dto";
import UpdateDisplayDto from "./dto/updateDisplay.dto";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('displays')
@Controller('displays')
export default class ApiDisplaysController {
  constructor(private readonly displaysService: DisplaysService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all displays for user' })
  @ApiResponse({ status: 204, description: 'No displays yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllDisplays(
    @SupertokenUserId(UserFromSupertokenId) user: User
  ) {
    return await this.displaysService.getAllDisplays(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Display found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async getDisplayById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') displayId: number
  ) {
    return await this.displaysService.getDisplayById(user.id, displayId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new display' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addDisplay(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() displayData: CreateDisplayDto
  ) {
    return await this.displaysService.addDisplay(user.id, displayData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated display' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async updateTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') displayId: number,
    @Body() displayData: UpdateDisplayDto
  ) {
    return await this.displaysService.updateDisplay(user.id, displayId, displayData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Display was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No display with this id' })
  async removeTodo(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') displayId: number
  ) {
    return await this.displaysService.removeDisplay(user.id, displayId);
  }
}