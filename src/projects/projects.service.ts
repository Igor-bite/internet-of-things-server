import { Injectable, NotImplementedException } from "@nestjs/common";
import { Project } from "@prisma/client";
import { CreateProjectDto } from "./dto/createProject.dto";
import { UpdateProjectDto } from "./dto/updatePost.dto";

@Injectable()
export default class ProjectsService {
  getAllProjects(userId: number): Promise<Project[]> {
    throw new NotImplementedException();
  }

  getProjectById(userId: number, projectId: number): Promise<Project> {
    throw new NotImplementedException();
  }

  addProject(userId: number, projectData: CreateProjectDto): Promise<Project> {
    throw new NotImplementedException();
  }

  removeProject(userId: number, projectId: number): Promise<Project> {
    throw new NotImplementedException();
  }

  updateProject(userId: number, projectId: number,
                projectData: UpdateProjectDto): Promise<Project> {
    throw new NotImplementedException();
  }

  shareProject(userId: number, projectId: number): Promise<Project> {
    throw new NotImplementedException();
  }
}