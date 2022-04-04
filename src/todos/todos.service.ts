import { Injectable, NotImplementedException } from "@nestjs/common";
import { ToDo as ToDoModel, TodoState} from '@prisma/client';

@Injectable()
export default class TodosService {
  getAllTodos(userId: number): Promise<ToDoModel[]> {
    throw new NotImplementedException();
  }

  getTodoById(userId: number, todoId: string): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  addTodo(userId: number, todoData: { title: string; description?: string }): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  updateTodo(userId: number, todoId: string,
                   todoData: { title?: string; description?: string }): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  changeState(userId: number, todoId: string, state: TodoState): Promise<ToDoModel> {
    throw new NotImplementedException();
  }

  removeTodo(userId: number, todoId: string): Promise<ToDoModel> {
    throw new NotImplementedException();
  }
}