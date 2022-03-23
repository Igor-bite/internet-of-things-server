import { Body, Controller, Delete, Render, Get, Param, Post, Put } from '@nestjs/common';
import ProjectsService from '../services/projects.service';

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
}