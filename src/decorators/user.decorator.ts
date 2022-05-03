import { createParamDecorator, ExecutionContext, PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import UsersService from "../users/users.service";

export const SupertokenUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const session = request.session;

    return session?.["userId"];
  },
);

@Injectable()
export class UserFromSupertokenId implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    return this.usersService.getUserBySupertokenId(value);
  }
}