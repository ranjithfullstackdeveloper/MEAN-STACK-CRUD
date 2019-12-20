import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  listId: string;
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => this.listId = params.listId);
    }

  ngOnInit() {
  }
 addTask(value: string) {
   this.taskService.createTask(this.listId, value)
       .subscribe(() => this.router.navigate(['../'], { relativeTo: this.route }));
 }
}
