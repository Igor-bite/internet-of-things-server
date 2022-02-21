import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import CreatePostDto from './dto/createPost.dto';
import { Project } from "./project.interface";
// import UpdatePostDto from './dto/updatePost.dto';

@Injectable()
export default class ProjectsService {
  private lastProjectId = 0;
  private posts: Project[] = [{id: 1, title: "First project", img: "https://picsum.photos/id/451/800/500"},
                              {id: 2, title: "William Iven", img: "https://picsum.photos/id/606/800/500"},
                              {id: 3, title: "Simon Pape", img: "https://picsum.photos/id/186/800/500"},
                              {id: 4, title: "Noah Rosenfield", img: "https://picsum.photos/id/52/800/500"}];

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