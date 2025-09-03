import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoService } from '../../services/todo';

@Component({
  selector: 'app-todo-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-form.html',
  styleUrl: './todo-form.css'
})
export class TodoFormComponent {
  private todoService = inject(TodoService);
  newTodoTitle = '';

  onSubmit(): void {
    if (this.newTodoTitle.trim()) {
      this.todoService.addTodo(this.newTodoTitle);
      this.newTodoTitle = '';
    }
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSubmit();
    }
  }
}
