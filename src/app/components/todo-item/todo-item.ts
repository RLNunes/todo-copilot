import { Component, Input, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TodoItem, TodoService } from '../../services/todo';

@Component({
  selector: 'app-todo-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.css'
})
export class TodoItemComponent {
  @Input() todo!: TodoItem;
  private todoService = inject(TodoService);
  isEditing = false;
  editTitle = '';

  toggleComplete(): void {
    this.todoService.toggleTodo(this.todo.id);
  }

  deleteTodo(): void {
    this.todoService.deleteTodo(this.todo.id);
  }

  startEdit(): void {
    this.isEditing = true;
    this.editTitle = this.todo.title;
  }

  saveEdit(): void {
    if (this.editTitle.trim()) {
      this.todoService.editTodo(this.todo.id, this.editTitle);
      this.isEditing = false;
    } else {
      this.cancelEdit();
    }
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editTitle = '';
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.saveEdit();
    } else if (event.key === 'Escape') {
      this.cancelEdit();
    }
  }
}
