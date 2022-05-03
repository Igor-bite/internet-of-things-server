import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import ProjectsService from './projects.service';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";
import { User } from "../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import ControlsService from "../controls/controls.service";
import DisplaysService from "../displays/displays.service";
import { AuthGuard } from "../auth/auth.guard";

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export default class ApiProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly controlsService: ControlsService,
    private readonly displaysService: DisplaysService
  ) {}

  @Get()
  @ApiOkResponse({ description: 'Returned all projects for user with page' })
  @ApiResponse({ status: 204, description: 'No projects yet' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiQuery({
    name: "page",
    type: Number,
    description: "Page number of showing projects. If not presented, returns all projects",
    required: false
  })
  async getProjectsPaged(
    @User('id') userId: number,
    @Query('page') page?: number
  ) {
    if (!page) {
      return { project: await this.projectsService.getAllProjects(userId) }
    }
    page = Number(page)
    return { projects: await this.projectsService.getProjectsPaged(userId, page) };
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

  @Get(':id/controls')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getControlsInProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ) {
    return await this.controlsService.getControlsInProject(userId, projectId);
  }

  @Get(':id/displays')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getDisplaysInProject(
    @User('id') userId: number,
    @Param('id') projectId: number
  ) {
    return await this.displaysService.getDisplaysInProject(userId, projectId);
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