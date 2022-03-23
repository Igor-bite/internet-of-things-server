import { Body, Controller, Delete, Render, Get, Param, Post, Put } from '@nestjs/common';
import ProjectsService from '../services/projects.service';
// import CreatePostDto from './dto/createPost.dto';
// import UpdatePostDto from './dto/updatePost.dto';

@Controller('projects')
export default class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService
  ) {}

  @Get()
  @Render('projects')
  getAllProjects() {
    return {projects: this.projectsService.getAllProjects()};
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    return this.projectsService.getProjectById(Number(id));
  }

  // @Post()
  // async createPost(@Body() post: CreatePostDto) {
  //   return this.postsService.createPost(post);
  // }
  //
  // @Put(':id')
  // async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
  //   return this.postsService.replacePost(Number(id), post);
  // }
  //
  // @Delete(':id')
  // async deletePost(@Param('id') id: string) {
  //   this.postsService.deletePost(Number(id));
  // }
}