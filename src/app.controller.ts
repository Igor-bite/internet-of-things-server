import { Get, Controller, Render, Redirect } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {}
}
