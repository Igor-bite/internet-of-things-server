import { Get, Controller, Render } from "@nestjs/common";

@Controller()
export class AppController {

  @Get()
  @Render('index')
  root() {
    return { isLogged: false, name: "Igor Klyuzhev" };
  }
}
