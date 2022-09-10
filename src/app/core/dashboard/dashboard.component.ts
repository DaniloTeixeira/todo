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

  form!: FormGroup<{
    description: FormControl<string | null>;
  }>;

  constructor(private fb: FormBuilder, private storage: StorageService) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadTodos();
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
    const id = this.todos?.length + 1;

    this.todos?.push(new Todo(id, description!, false));

    this.saveTodos(this.todos);
    this.resetForm();
  }

  private resetForm(): void {
    this.form.reset();
  }

  private saveTodos(todos: Todo[]): void {
    this.storage.saveTodos(todos);
  }

  private loadTodos(): void {
    this.storage.loadTodos(this.todos);
  }

  deleteTodo(id: number): void {}
}
