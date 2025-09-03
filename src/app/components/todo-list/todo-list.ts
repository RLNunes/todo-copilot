import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map } from 'rxjs';
import { TodoItem, TodoService } from '../../services/todo';
import { TodoItemComponent } from '../todo-item/todo-item';

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, TodoItemComponent],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoListComponent implements OnInit {
  private todoService = inject(TodoService);
  todos$!: Observable<TodoItem[]>;
  completedCount$!: Observable<number>;
  remainingCount$!: Observable<number>;

  ngOnInit(): void {
    this.todos$ = this.todoService.getTodos();
    this.completedCount$ = this.todos$.pipe(
      map(todos => todos.filter(todo => todo.completed).length)
    );
    this.remainingCount$ = this.todos$.pipe(
      map(todos => todos.filter(todo => !todo.completed).length)
    );
  }

  trackByTodoId(index: number, todo: TodoItem): string {
    return todo.id;
  }
}
