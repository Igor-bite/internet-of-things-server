import { Get, Post, Delete, Param, Controller, Body, Put } from "@nestjs/common";
import UsersService from './users.service';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(
    @User('id') userId: number
  ) {
    return await this.usersService.getAllUsers(userId);
  }

  @Get(':id')
  async getUserById(
    @User('id') userId: number,
    @Param('id') neededUserId: number
  ) {
    return await this.usersService.getUserById(userId, neededUserId);
  }

  @Post()
  async addUser(
    @User('id') userId: number,
    @Body() newUserData: CreateUserDto
  ) {
    return await this.usersService.addUser(userId, newUserData);
  }

  @Put(':id')
  async updateUser(
    @User('id') userId: number,
    @Param('id') updatedUserId: number,
    @Body() updatedUserData: UpdateUserDto
  ) {
    return await this.usersService.updateUser(userId, updatedUserId, updatedUserData);
  }

  @Delete(':id')
  async removeUser(
    @User('id') userId: number,
    @Param('id') removedUserId: number
  ) {
    return await this.usersService.removeUser(userId, removedUserId);
  }
}