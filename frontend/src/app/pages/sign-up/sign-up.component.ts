import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  showSuccessMessage: boolean;
  showErrorMessage: boolean;
  serverErrorMessages: any;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
this.userService.createUser(form.value).subscribe(
  res =>{
    this.showSuccessMessage = true;
    setTimeout(()=> this.showSuccessMessage = false, 4000);
    this.resetForm(form);
  },
  err => {
 if (err.status ===422) {
   this.serverErrorMessages = err.error.join('<br/>');
    }
    else{
      this.serverErrorMessages = "Something went wrong. Please contact Admin.";
    }
  }
);
  }
  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
     email: '',
     password: ''
    };
    form.resetForm();
    this.serverErrorMessages='';
  }

}
