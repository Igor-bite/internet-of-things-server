import { Injectable, NotImplementedException } from "@nestjs/common";
import { ToDo as ToDoModel, TodoState} from '@prisma/client';
import { CreateTodoDto } from "./dto/createTodo.dto";
import { UpdateTodoDto } from "./dto/updateTodo.dto";

@Injectable()
export default class TodosService {
  getAllTodos(userId: number): Promise<ToDoModel[]> {
    throw new NotImplementedException();
  }

  getTodoById(userId: number, todoId: number): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  addTodo(userId: number, todoData: CreateTodoDto): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  updateTodo(userId: number, todoId: number, todoData: UpdateTodoDto): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  removeTodo(userId: number, todoId: number): Promise<ToDoModel> {
    throw new NotImplementedException();
  }
}