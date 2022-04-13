import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import ProjectsService from './projects.service';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export default class ApiProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all projects for user' })
  @ApiResponse({ status: 204, description: 'No projects yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllProjects(
    @User('id') userId: number
  ) {
    return { projects: await this.projectsService.getAllProjects(userId) };
  }

  @Get('page=:page')
  @ApiOkResponse({ description: 'Returned all projects for user with page' })
  @ApiResponse({ status: 204, description: 'No projects yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async getAllProjectsPaged(
    @User('id') userId: number,
    @Param('page', ParseIntPipe) page: number
  ) {
    return { projects: await this.projectsService.getAllProjectsPaged(userId, page) };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getProjectById(
    @User('id') userId: number,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.getProjectById(userId, projectId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new project' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addProject(
    @User('id') userId: number,
    @Body() projectData: CreateProjectDto
  ) {
    return await this.projectsService.addProject(userId, projectData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Project was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async removeProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.removeProject(userId, projectId);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated project' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async updateProject(
    @User('id') userId: number,
    @Param('id') projectId: number,
    @Body() projectData: UpdateProjectDto
  ) {
    return await this.projectsService.updateProject(userId, projectId, projectData);
  }

  @Get(':id/share')
  @ApiOkResponse({ description: 'Shared project' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async shareProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.shareProject(userId, projectId);
  }
}