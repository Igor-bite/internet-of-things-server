import { Injectable } from "@nestjs/common";
import { Project } from "@prisma/client";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";
import { PrismaService } from "../prisma/prisma.service";
import {v4 as uuidv4} from 'uuid';

@Injectable()
export default class ProjectsService {
  constructor(
    private readonly prisma: PrismaService
  ) {}

  async getAllProjects(userId: number): Promise<Project[]> {
    return await this.prisma.project.findMany();
  }

  async getProjectById(userId: number, projectId: number): Promise<Project> {
    return await this.prisma.project.findFirst({ where: { id: Number(projectId) }});
  }

  async addProject(userId: number, projectData: CreateProjectDto): Promise<Project> {
    return await this.prisma.project.create({ data: projectData });
  }

  async removeProject(userId: number, projectId: number): Promise<Project> {
    return await this.prisma.project.delete({ where: { id: Number(projectId) } });
  }

  async updateProject(userId: number, projectId: number,
                projectData: UpdateProjectDto): Promise<Project> {
    return await this.prisma.project.update({ where: { id: Number(projectId) }, data: projectData });
  }

  async shareProject(userId: number, projectId: number): Promise<Project> {
    let sharingCode = uuidv4();
    return await this.prisma.project.update({ where: { id: Number(projectId) }, data: { sharingCode: sharingCode } });
  }
}