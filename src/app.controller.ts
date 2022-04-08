import { Get, Controller, Render } from "@nestjs/common";
import ProjectsService from "./projects/projects.service";

@Controller()
export class AppController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('index')
  root() {
    return { isLogged: false, name: "Igor Klyuzhev" };
  }
}
