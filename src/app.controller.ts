import { Get, Controller, Render, Redirect } from "@nestjs/common";
import ProjectsService from "./projects/services/projects.service";

@Controller()
export class AppController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('index')
  root() {
    return {isLogged: false, name: "Igor Klyuzhev"};
  }
}
