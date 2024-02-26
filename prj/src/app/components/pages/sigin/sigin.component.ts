import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { UsersService } from 'src/app/shared/services/pageServices/pageServices/users.service';

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css'],
})
export class SiginComponent {
  /*================================*/
  /*================================*/
  /*============VARIABLES===========*/
  /*================================*/
  /*================================*/
  // @Output() LoginedUser = new EventEmitter<user>();
  isLoginError = false;
  LoginedUser = {
    email: '',
    id: '',
    img: '',
    name: '',
    password: '',
  };
  constructor(
    private localStg: LocalstoragesService,
    private router: Router,
    private usersServ: UsersService
  ) {}
  /*================================*/
  /*================================*/
  /*============USER FORM===========*/
  /*================================*/
  /*================================*/
  userForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
  });
  /*================================*/
  /*================================*/
  /*============FUNCTIONS===========*/
  /*================================*/
  /*================================*/
  submitSignIn() {
    const email = this.userForm.value?.email as string,
      password = this.userForm.value?.password as string;
    this.usersServ;

    this.usersServ
      .GetUserByEmailAndPassword(email, password)
      .subscribe((user) => {
        this.LoginedUser = user;
      });

    this.usersServ
      .findUserByEmailAndPassword(email, password)
      .then((isUser) => {
        if (isUser) {
          this.localStg.setSign(true);
          this.localStg.setUserData(this.LoginedUser);
          this.router.navigate(['']);
        } else {
          this.isLoginError = true;
          setTimeout(() => {
            this.isLoginError = false;
          }, 3000);
        }
      });
  }
  signinWithGoogle() {}
}

// mebo123@gmail.com
