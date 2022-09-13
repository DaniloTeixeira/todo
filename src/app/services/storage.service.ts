import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  loadTodos(tasks: Todo[]): void {
    if (!localStorage['todos']) {
      return;
    }

    tasks = JSON.parse(localStorage.getItem('todos')!);
  }

  //OK
  saveTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //OK
  onDeleteTodo(todos: Todo[], id: number): void {
    const index = todos.findIndex((t) => t.id === id);

    todos.splice(index, 1);
  }

  clearLocalStorage(): void {
    localStorage.clear();
    alert('localStorage limpo');
  }
}
