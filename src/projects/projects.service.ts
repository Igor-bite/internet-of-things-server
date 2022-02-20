import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import CreatePostDto from './dto/createPost.dto';
import { Project } from "./project.interface";
// import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export default class ProjectsService {
  constructor() {
    console.log(`Created ProjectsService`);
  }
  private lastProjectId = 0;
  private posts: Project[] = [{id: 12, content: "", title: "Hello world!"}];

  getAllProjects() {
    return this.posts;
  }

  getProjectById(id: number) {
    const post = this.posts.find(post => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  // replacePost(id: number, post: UpdatePostDto) {
  //   const postIndex = this.posts.findIndex(post => post.id === id);
  //   if (postIndex > -1) {
  //     this.posts[postIndex] = post;
  //     return post;
  //   }
  //   throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  // }
  //
  // createPost(post: CreatePostDto) {
  //   const newPost = {
  //     id: ++this.lastPostId,
  //     ...post
  //   }
  //   this.posts.push(newPost);
  //   return newPost;
  // }
  //
  // deletePost(id: number) {
  //   const postIndex = this.posts.findIndex(post => post.id === id);
  //   if (postIndex > -1) {
  //     this.posts.splice(postIndex, 1);
  //   } else {
  //     throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  //   }
  // }
}