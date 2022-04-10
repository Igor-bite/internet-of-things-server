import { Injectable, NotImplementedException } from "@nestjs/common";
import { User } from '@prisma/client';
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export default class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllUsers(userId: number): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: number, neededUserId: number): Promise<User> {
    return await this.prisma.user.findFirst({ where: { id: Number(neededUserId) }});
  }

  async addUser(userId: number, newUserData: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: newUserData });
  }

  async updateUser(userId: number, updatedUserId: number, updatedUserData: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({ where: { id: Number(updatedUserId) }, data: updatedUserData });
  }

  async removeUser(userId: number, removedUserId: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id: Number(removedUserId) } });
  }
}