import {Component, inject, Input, OnInit, signal} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Task} from '../../models/Task';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {Observable} from 'rxjs';
import {NgClass} from '@angular/common';

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
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tazlfhwwgjrdmnenkwlt.supabase.co',
      'sb_publishable_-dmwj1v4OXJwNuxVg0K_eg_Duve4twm'
    );
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTaskById(Number(id)).subscribe({
        next: (taskData) => {
          this.task.set(taskData);
        },
        error: (err) => console.error('Erreur:', err)
      });
    }
  }
  getTaskById(id: number): Observable<Task> {
    return new Observable((observer) => {
      this.supabase
        .from('tasks')
        .select('*')
        .eq('id', id)
        .single()
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response.data as Task);
            observer.complete();
          }
        });
    });
  }

  updateStatusById(id: number, newStatus: string): Observable<Task> {
    return new Observable((observer) => {
      this.supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', id)
        .select()
        .single()
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response.data as Task);
            observer.complete();
          }
        })
    });
  }

  startDate(id: number, beginDate: Date): Observable<Task>{
    return  new Observable((observer) => {
      this.supabase
        .from('tasks')
        .update({start_date: beginDate})
        .eq('id', id)
        .select()
        .single()
        .then((response) =>{
          if(response.error){
            observer.error(response.error)
          } else{
            observer.next(response.data as Task);
            observer.complete()
          }
        })
    });
  }

  endDate(id: number, endDate: Date): Observable<Task>{
    return  new Observable((observer) => {
      this.supabase
        .from('tasks')
        .update({end_date: endDate})
        .eq('id', id)
        .select()
        .single()
        .then((response) =>{
          if(response.error){
            observer.error(response.error)
          } else{
            observer.next(response.data as Task);
            observer.complete()
          }
        })
    });
  }

  onStartTask():void{
    if(this.task().status === 'à faire'){
      this.updateStatusById(this.task().id, 'en cour').subscribe({
        next: (updateTask) => {
          this.task.set(updateTask)
        },
      })
      this.startDate(this.task().id, new Date()).subscribe({
        next: (updateTask) => {
          this.task.set(updateTask)
        },
      })
    }
  }

  onValidTask():void{
    if(this.task().status === 'en cour' || this.task().status === 'en retard'){
      this.updateStatusById(this.task().id, 'fini').subscribe({
        next:(updateTask) => {
          this.task.set(updateTask)
        },
      })
      this.endDate(this.task().id, new Date()).subscribe({
        next:  (updateTask) => {
          this.task.set(updateTask)
        },
      })
    }
  }
}

