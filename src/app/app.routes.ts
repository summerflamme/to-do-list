import { Routes } from '@angular/router';
import { TaskCard } from './components/task-card/task-card';
import {Home} from './home/home';
import {TasksList} from './components/tasks-list/tasks-list';
import { TaskEdit } from './components/task-edit/task-edit';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'task/:id', component: TaskCard},
  {path: 'tasks', component: TasksList},
  {path: 'edit/:id', component: TaskEdit}
];
