import { Injectable, NotImplementedException } from "@nestjs/common";
import { User } from '@prisma/client';
import CreateUserDto from "./dto/createUser.dto";
import UpdateUserDto from "./dto/updateUser.dto";

@Injectable()
export default class UsersService {
  getAllUsers(userId: number): Promise<User[]> {
    throw new NotImplementedException();
  }

  getUserById(userId: number, neededUserId: number): Promise<User> {
    throw new NotImplementedException();
  }

  addUser(userId: number, newUserData: CreateUserDto): Promise<User> {
    throw new NotImplementedException();
  }

  updateUser(userId: number, updatedUserId: number, updatedUserData: UpdateUserDto): Promise<User> {
    throw new NotImplementedException();
  }

  removeUser(userId: number, removedUserId: number): Promise<User> {
    throw new NotImplementedException();
  }
}