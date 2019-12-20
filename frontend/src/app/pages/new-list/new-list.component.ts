import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import List from 'src/app/models/list';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  addList(value: string) {
    this.taskService.createList(value)
        .subscribe((list: List) => this.router.navigate(['/lists', list._id]));
  }
}
