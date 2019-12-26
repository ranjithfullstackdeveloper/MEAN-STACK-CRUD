import { Injectable } from '@angular/core';
import { User } from './user.model';
import { WebService } from 'src/app/web.service';
//import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
   selectedUser: User = {
     fullName: '',
     email: '',
     password: ''
   };
  constructor(private webservice: WebService) { }

  createUser(user: User) {
    return this.webservice.post('register', user);
  }
}
