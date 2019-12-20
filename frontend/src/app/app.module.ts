import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { Routes, RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
const routes: Routes = [
  {path: '', redirectTo: 'lists', pathMatch: 'full'},
  {path: 'lists', component: TaskListComponent},
  {path: 'lists/:listId', component: TaskListComponent},
  {path: 'new-list', component: NewListComponent},
  {path: 'lists/:listId/new-task', component: NewTaskComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    NewListComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
