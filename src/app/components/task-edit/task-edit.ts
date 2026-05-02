import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/Task';

@Component({
  selector: 'app-task-edit',
  imports: [FormsModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEdit {
  protected task: Task = new Task();

  protected onSubmit() {

  }
}
