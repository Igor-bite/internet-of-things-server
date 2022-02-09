import { Get, Controller, Render, Redirect } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  @Redirect("/home.html")
  root() {}

  @Get()
  @Render('home')
  mainPage() {}
}
