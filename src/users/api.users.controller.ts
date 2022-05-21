import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import UsersService from './users.service';
import { SupertokenUserId, UserFromSupertokenId } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export default class ApiUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all users for user' })
  @ApiResponse({ status: 204, description: 'No users yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllUsers(
    @SupertokenUserId(UserFromSupertokenId) user: User
  ) {
    return await this.usersService.getAllUsers(user.id);
  }

  @Get(':id')
  @ApiOkResponse({ description: 'User found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No user with this id' })
  async getUserById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') neededUserId: number
  ) {
    return await this.usersService.getUserById(user.id, neededUserId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new user' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addUser(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() newUserData: CreateUserDto
  ) {
    return await this.usersService.addUser(user.id, newUserData);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated user' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No user with this id' })
  async updateUser(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') updatedUserId: number,
    @Body() updatedUserData: UpdateUserDto
  ) {
    return await this.usersService.updateUser(user.id, updatedUserId, updatedUserData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No user with this id' })
  async removeUser(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') removedUserId: number
  ) {
    return await this.usersService.removeUser(user.id, removedUserId);
  }
}