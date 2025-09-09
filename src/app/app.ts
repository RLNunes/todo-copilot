import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoFormComponent } from './components/todo-form/todo-form';
import { TodoListComponent } from './components/todo-list/todo-list';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TodoFormComponent, 
    TodoListComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  protected readonly title = signal('Todo App');
}
