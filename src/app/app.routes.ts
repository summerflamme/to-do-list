import { Routes } from '@angular/router';
import { TaskCard } from './components/task-card/task-card';
import {Home} from './home/home';
import {TasksList} from './tasks-list/tasks-list';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'task/:id', component: TaskCard},
  {path: 'tasks', component: TasksList}
];
