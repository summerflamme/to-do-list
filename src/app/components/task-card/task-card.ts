import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Task} from '../../models/Task';
import {NgClass} from '@angular/common';
import {TaskService} from '../../service/task-service';

@Component({
  selector: 'app-task-card',
  imports: [
    NgClass
  ],
  templateUrl: './task-card.html',
  styleUrl: './task-card.css',
})
export class TaskCard implements  OnInit{

  @Input()
  public task = signal<Task>(new Task())
  private route = inject(ActivatedRoute)
  private taskService = inject(TaskService)

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskService.getTaskById(Number(id)).subscribe({
        next: (taskData) => {
          this.task.set(taskData);
        },
        error: (err) => console.error('Erreur:', err)
      });
    }
  }


  onStartTask():void{
    if(this.task().status === 'à faire'){
      this.taskService.updateStatusById(this.task().id, 'en cour').subscribe({
        next: (updateTask) => {
          this.task.set(updateTask)
        },
      })
      this.taskService.startDate(this.task().id, new Date()).subscribe({
        next: (updateTask) => {
          this.task.set(updateTask)
        },
      })
    }
  }

  onValidTask():void{
    if(this.task().status === 'en cour' || this.task().status === 'en retard'){
      this.taskService.updateStatusById(this.task().id, 'fini').subscribe({
        next:(updateTask) => {
          this.task.set(updateTask)
        },
      })
      this.taskService.endDate(this.task().id, new Date()).subscribe({
        next: (updateTask) => {
          this.task.set(updateTask)
        },
      })
    }
  }
  onResetTask():void{
    if(this.task().status === 'fini'){
      this.taskService.updateStatusById(this.task().id, 'à faire').subscribe({
        next:(updateTask) => {
          this.task.set(updateTask)
        },
        })
          this.taskService.endDate(this.task().id, null).subscribe({
          next: (updateTask) => {
            this.task.set(updateTask)
          }
        })
    }
  }
}

