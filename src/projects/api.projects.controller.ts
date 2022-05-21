import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import ProjectsService from './projects.service';
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";
import { SupertokenUserId, UserFromSupertokenId } from"../decorators/user.decorator";
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import ControlsService from "../controls/controls.service";
import DisplaysService from "../displays/displays.service";
import { AuthGuard } from "../auth/auth.guard";
import { User } from "@prisma/client";

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
@UseGuards(AuthGuard)
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
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Query('page') page?: number
  ) {
    if (!page) {
      return { project: await this.projectsService.getAllProjects(user.id) }
    }
    page = Number(page)
    return { projects: await this.projectsService.getProjectsPaged(user.id, page) };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getProjectById(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.getProjectById(user.id, projectId);
  }

  @Get(':id/controls')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getControlsInProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number
  ) {
    return await this.controlsService.getControlsInProject(user.id, projectId);
  }

  @Get(':id/displays')
  @ApiOkResponse({ description: 'Project found and returned' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async getDisplaysInProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number
  ) {
    return await this.displaysService.getDisplaysInProject(user.id, projectId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Created new project' })
  @ApiResponse({ status: 400, description: 'The data is not valid for creating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  async addProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Body() projectData: CreateProjectDto
  ) {
    return await this.projectsService.addProject(user.id, projectData);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Project was deleted' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async removeProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.removeProject(user.id, projectId);
  }

  @Put(':id')
  @ApiOkResponse({ description: 'Updated project' })
  @ApiResponse({ status: 304, description: 'No changes' })
  @ApiResponse({ status: 400, description: 'The data is not valid for updating' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async updateProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number,
    @Body() projectData: UpdateProjectDto
  ) {
    return await this.projectsService.updateProject(user.id, projectId, projectData);
  }

  @Get(':id/share')
  @ApiOkResponse({ description: 'Shared project' })
  @ApiResponse({ status: 401, description: 'No authorization' })
  @ApiResponse({ status: 404, description: 'No project with this id' })
  async shareProject(
    @SupertokenUserId(UserFromSupertokenId) user: User,
    @Param('id') projectId: number
  ) {
    return await this.projectsService.shareProject(user.id, projectId);
  }
}