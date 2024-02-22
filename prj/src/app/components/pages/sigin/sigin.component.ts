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
  LoginedUser: user[] = [];
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
    this.usersServ
      .findUserByEmailAndPassword(email, password)
      .subscribe((user) => {
        // console.log(user);
        if (user) {
          this.localStg.setSign(true);
          this.localStg.setUserData(user);
          this.router.navigate(['']);
        } else {
          this.isLoginError = true;
          setTimeout(() => {
            this.isLoginError = false;
          }, 3000);
        }
      });
  }
}

// mebo123@gmail.com
