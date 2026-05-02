import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable } from 'rxjs';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://tazlfhwwgjrdmnenkwlt.supabase.co',
      'sb_publishable_-dmwj1v4OXJwNuxVg0K_eg_Duve4twm',
    );
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
        });
    });
  }

  startDate(id: number, beginDate: Date): Observable<Task> {
    return new Observable((observer) => {
      this.supabase
        .from('tasks')
        .update({ start_date: beginDate })
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
        });
    });
  }

  endDate(id: number, endDate: Date | null): Observable<Task> {
    return new Observable((observer) => {
      this.supabase
        .from('tasks')
        .update({ end_date: endDate })
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
        });
    });
  }
}
