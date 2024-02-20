import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../../shared/models/passwordconfirmation';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/models/userModel';
import { UsersService } from 'src/app/shared/services/pageServices/pageServices/users.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  /*================================*/
  /*================================*/
  /*============VARIABLES===========*/
  /*================================*/
  /*================================*/
  users: user[] = [];
  isEmailExist = false;
  userDefaultImg: string = '';
  constructor(
    private firestorage: AngularFireStorage,
    private usersServ: UsersService,
    private router: Router
  ) {
    this.firestorage
      .ref('userDefImg/userDefaultImg.png')
      .getDownloadURL()
      .subscribe((url) => {
        console.log(url);
        this.userDefaultImg = url;
      });
  }
  /*================================*/
  /*================================*/
  /*============USER FORM===========*/
  /*================================*/
  /*================================*/
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

  /*================================*/
  /*================================*/
  /*============FUNCTIONS===========*/
  /*================================*/
  /*================================*/
  checkEmailExists(value: any) {
    this.usersServ.getUsers().subscribe((item) => {
      //!some abrunesb boolenas gansxvavebit find isgan.
      this.isEmailExist = item.some((user) => user.email === value);
      // console.log(this.isEmailExist);
    });
  }

  signUp() {
    this.usersServ.addUser({
      name: this.userForm.value.name as string,
      email: this.userForm.value.email as string,
      password: this.userForm.value.password as string,
      img: this.userDefaultImg,
    });
    this.router.navigate(['/login']);
  }

  // async userDefaultImg() {
  //   const img = 'userDefaultImg.png';
  //   const path = `userDefImg/${img}`;
  //   const uploadImg = await this.firestorage.upload(path, img);
  //   const getUrl = await uploadImg.ref.getDownloadURL();
  //   console.log(getUrl);
  // }
}
