import { Injectable } from '@angular/core';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  loadTodos(todos: Todo[]): void {
    const localStorageItems = localStorage.getItem('todos');
    todos = JSON.parse(localStorageItems!);
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  deleteTodo(todos: Todo[], id: number): void {
    const _todo = todos.filter((t) => t.id !== id);

    localStorage.removeItem(JSON.stringify(_todo));
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
