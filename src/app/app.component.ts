import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from './models/Todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();

    if (this.todos) {
      this.loadTodos();
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  deleteTodo(todo: Todo): void {
    const index = this.todos.indexOf(todo);

    if (index !== -1) {
      this.todos.splice(index, 1);
    }
  }

  createTodo(): void {
    if (this.form.invalid) {
      return;
    }

    const description = this.form.controls['description'].value;
    const id = this.todos?.length + 1;

    console.log(description, id);

    this.todos?.push(new Todo(id, description, false));

    this.saveTodosInLocalStorage();
    this.resetForm();
    this.loadTodos();
  }

  private resetForm(): void {
    this.form.reset();
  }

  private saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todos);

    localStorage.setItem('todos', todos);
  }

  private removeTodosOfLocalStorage(): void {
    localStorage.removeItem('todos');
  }

  private loadTodos(): void {
    const todos = localStorage.getItem('todos')!;

    this.todos = JSON.parse(todos);
  }
}
