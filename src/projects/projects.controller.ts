import { Body, Controller, Delete, Render, Get, Param, Post } from "@nestjs/common";
import ProjectsService from './projects.service';
import { Project } from "@prisma/client";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('projects')
  getAllProjects(
    @User('id') userId: number
  ): Promise<Project[]> {
    return this.projectsService.getAllProjects(userId);
  }

  @Get(':id')
  getProjectById(
    @User('id') userId: number,
    @Param('id') projectId: number
  ): Promise<Project> {
    return this.projectsService.getProjectById(userId, projectId);
  }

  @Post('add')
  addProject(
    @User('id') userId: number,
    @Body() projectData: CreateProjectDto
  ): Promise<Project> {
    return this.projectsService.addProject(userId, projectData);
  }

  @Delete(':id')
  removeProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ): Promise<Project> {
    return this.projectsService.removeProject(userId, projectId);
  }

  @Post(':id/update')
  updateProject(
    @User('id') userId: number,
    @Param('id') projectId: number,
    @Body() projectData: UpdateProjectDto
  ): Promise<Project> {
    return this.projectsService.updateProject(userId, projectId, projectData);
  }

  @Get(':id/share')
  shareProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ): Promise<Project> {
    return this.projectsService.shareProject(userId, projectId);
  }
}