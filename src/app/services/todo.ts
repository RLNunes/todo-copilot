import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosSubject = new BehaviorSubject<TodoItem[]>([]);
  private idCounter = 1;

  constructor() {
    // Load todos from localStorage if available
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos);
      // Convert createdAt string back to Date object
      const todos = parsedTodos.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      this.todosSubject.next(todos);
      // Set counter to max id + 1
      this.idCounter = Math.max(...todos.map((t: TodoItem) => parseInt(t.id)), 0) + 1;
    }
  }

  getTodos(): Observable<TodoItem[]> {
    return this.todosSubject.asObservable();
  }

  addTodo(title: string): void {
    const currentTodos = this.todosSubject.value;
    const newTodo: TodoItem = {
      id: this.idCounter.toString(),
      title: title.trim(),
      completed: false,
      createdAt: new Date()
    };
    const updatedTodos = [...currentTodos, newTodo];
    this.todosSubject.next(updatedTodos);
    this.saveTodos(updatedTodos);
    this.idCounter++;
  }

  toggleTodo(id: string): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject.next(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  deleteTodo(id: string): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== id);
    this.todosSubject.next(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  editTodo(id: string, newTitle: string): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle.trim() } : todo
    );
    this.todosSubject.next(updatedTodos);
    this.saveTodos(updatedTodos);
  }

  private saveTodos(todos: TodoItem[]): void {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}
