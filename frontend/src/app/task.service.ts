import { Injectable } from '@angular/core';
import {WebService } from './web.service';
import Task from './models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webservice: WebService) { }

  getLists() {
    return this.webservice.get('lists');
  }
  createList(title: string) {
    return this.webservice.post('lists', { title } );
  }
  getTasks(listId: string) {
    console.log(listId);
    return this.webservice.get(`lists/${listId}/tasks`);
  }
  createTask(listId: string, title: string) {
    return this.webservice.post(`lists/${listId}/tasks`, { title } );
  }
  deleteList(listId: string) {
    return this.webservice.delete(`lists/${listId}`);
  }
 deleteTask(listId: string, taskId: string) {
   return this.webservice.delete(`lists/${listId}/tasks/${taskId}`);
 }
 setCompleted(listId: string, task: Task) {
 return this.webservice.patch(`lists/${listId}/tasks/${task._id}`, {completed: !task.completed});
 }
}
