import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../../shared/models/passwordconfirmation';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/models/userModel';
import { UsersService } from 'src/app/shared/services/pageServices/pageServices/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  users: user[] = [];
  constructor(private usersServ: UsersService, private router: Router) {}
  userForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
    confirmpassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
      passwordMatch(),
    ]),
  });

  signUp() {
    // this.usersServ.addUser({
    //   uid: '',
    //   name: this.userForm.value.name as string,
    //   email: this.userForm.value.email as string,
    //   password: this.userForm.value.password as string,
    //   img: '',
    // });
  }
}
