import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Todo } from 'src/app/models/Todo';
import { StorageService } from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  mode?: 'create' | 'manage';

  form!: FormGroup<{
    description: FormControl<string | null>;
  }>;

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadTodos();
    this.setMode();
  }

  private setMode(): void {
    if (this.todos) {
      this.mode = 'manage';
      return;
    }
    this.mode = 'create';
  }

  private buildForm(): void {
    this.form = this.fb.group({
      description: this.fb.control<string | null>('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),
    });
  }

  createTodo(): void {
    if (this.form.invalid) {
      return;
    }

    const description = this.form.controls['description'].value;
    const id = this.todos?.length;

    this.todos?.push(new Todo(id, description!, false));

    this.saveTodos(this.todos);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }

  private saveTodos(todos: Todo[]): void {
    this.storageService.saveTodos(todos);
  }

  private loadTodos(): void {
    if (!localStorage['todos']) {
      return;
    }

    this.todos = JSON.parse(localStorage.getItem('todos')!);
  }

  onDeleteTodo(id: number): void {
    this.storageService.onDeleteTodo(this.todos, id);
  }

  toggleDoneTask(todo: Todo): void {
    todo.done = !todo.done;
  }
}
