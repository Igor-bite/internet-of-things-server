import { Get, Controller, Render } from "@nestjs/common";
import { SupertokenUserId, UserFromSupertokenId } from "./decorators/user.decorator";
import { User } from "@prisma/client";

@Controller()
export class AppController {

  @Get()
  @Render('index')
  root(
    @SupertokenUserId(UserFromSupertokenId) user: User
  ) {
    if (user == undefined) {
      return { isLogged: false };
    }
    return { isLogged: true, user: user }
  }
}
