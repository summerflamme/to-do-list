import {Component, Input, OnInit, signal} from '@angular/core';
import {TaskCard} from '../components/task-card/task-card';
import {Task} from '../models/Task';
import {Observable} from 'rxjs';
import {createClient, SupabaseClient} from '@supabase/supabase-js';


@Component({
  selector: 'app-tasks-list',
  imports: [TaskCard],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.css',
})
export class TasksList implements OnInit{

  public tasks = signal<Task[]>([]);
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tazlfhwwgjrdmnenkwlt.supabase.co',
      'sb_publishable_-dmwj1v4OXJwNuxVg0K_eg_Duve4twm'
    );
  }

  getTasks(): Observable<Task[]> {
    return new Observable((observer) => {
      this.supabase
        .from('tasks')
        .select('*')
        .then((response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response.data as Task[]);
            observer.complete();
          }
        });
    });
  }

  ngOnInit() {
    this.getTasks().subscribe({
    next: (taskData) => {
      this.tasks.set(taskData);
    },
    error: (err) => console.error('Erreur:', err)
  });
  }

  protected readonly signal = signal;
}
