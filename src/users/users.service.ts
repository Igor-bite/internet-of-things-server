import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "../auth/auth.service";
import SignInUserDto from "./dto/signInUser.dto";

@Injectable()
export default class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auth: AuthService
  ) {}

  async getAllUsers(userId: number): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async getUserById(userId: number, neededUserId: number): Promise<User> {
    return await this.prisma.user.findFirst({ where: { id: Number(neededUserId) }});
  }

  async authenticateUserByEmail(userData: SignInUserDto): Promise<Boolean> {
    let user = await this.prisma.user.findUnique({ where: { email: userData.email }});
    return this.auth.validateUser(user, userData.password);
  }

  async addUser(userId: number, newUserData: CreateUserDto): Promise<User> {
    return await this.auth.createNewUser(newUserData);
  }

  async updateUser(userId: number, updatedUserId: number, updatedUserData: UpdateUserDto): Promise<User> {
    return await this.prisma.user.update({ where: { id: Number(updatedUserId) }, data: updatedUserData });
  }

  async removeUser(userId: number, removedUserId: number): Promise<User> {
    return await this.prisma.user.delete({ where: { id: Number(removedUserId) } });
  }
}