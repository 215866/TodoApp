import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Task} from '../../models/task';
import {TodoService} from '../../services/todo.service';
import {Status} from '../../models/status';
import {Priority} from '../../models/priority';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{

  open: Task[];
  inProgress: Task[];
  done: Task[];


  constructor(private todoService: TodoService, private router: Router) {
  }

  ngOnInit(): void {
    this.todoService.getOpenTodos().subscribe(todos => {
      this.open = todos;
    });
    this.todoService.getInProgressTodos().subscribe(todos => {
      this.inProgress = todos;
    });
    this.todoService.getDoneTodos().subscribe(todos => {
      this.done = todos;
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  addNewTask() {
    this.open.unshift(new Task('Tu wprowadź swoją nazwę', Status.Open, '', undefined, Priority.Medium));
  }

  editTodo(item: Task) {
    this.router.navigate(['editTodo'], { queryParams: { id: item.id } });
  }
}
