import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import CreateUserDto from "../users/dto/createUser.dto";
import { User, SubscriptionPlan } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(user: User, pass: string): Promise<any> {
    const isMatched = await bcrypt.compare(pass, user.passwordHash);
    return {isLogged: isMatched};
  }

  async createNewUser(user: CreateUserDto): Promise<User> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(user.password, saltRounds);
    let userData = new UserModel(user, hash);
    return await this.prisma.user.create({ data: userData });
  }
}

class UserModel {
  constructor(user: CreateUserDto, passwordHash: string) {
    this.passwordHash = passwordHash;
    this.email = user.email;
    this.name = user.name;
    this.surname = user.surname;
    this.subscriptionPlan = user.subscriptionPlan;
  }
  email: string;
  passwordHash: string;
  name: string | null;
  surname: string | null;
  subscriptionPlan: SubscriptionPlan;
}