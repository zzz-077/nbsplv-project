import { Component, EventEmitter, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleAuthProvider } from 'firebase/auth';
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
    private usersServ: UsersService,
    private fireAuth: AngularFireAuth
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

    this.usersServ.findEnteredUserData(email, password).subscribe((user) => {
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

  signinWithGoogle() {
    this.fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then((userCredential) => {
        const user = userCredential.user;
        this.usersServ
          .ifUserExistsByEmail(user?.email as string)
          .subscribe((userData) => {
            if (userData) {
              this.LoginedUser = {
                email: userData.user.email as string,
                id: userData.id as string,
                img: userData.user.img as string,
                name: userData.user.name as string,
                password: '000000',
              };
              console.log('SIGNED EXISTING USER', this.LoginedUser);
              this.localStg.setSign(true);
              this.localStg.setUserData(this.LoginedUser);
              this.router.navigate(['']);
            } else {
              if (user) {
                console.log('SIGNED NEW UNEXISTING USER', user);
                const id = user.uid;
                this.usersServ
                  .addUserByGoogle(
                    {
                      name: user.displayName as string,
                      email: user.email as string,
                      password: '000000',
                      img: user.photoURL as string,
                    },
                    id
                  )
                  .subscribe(() => {
                    this.LoginedUser = {
                      email: user.email as string,
                      id: id,
                      img: user.photoURL as string,
                      name: user.displayName as string,
                      password: '000000',
                    };
                    console.log(this.LoginedUser);
                    this.localStg.setSign(true);
                    this.localStg.setUserData(this.LoginedUser);
                    this.router.navigate(['']);
                  });
              }
            }
          });
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
      });
  }
}
