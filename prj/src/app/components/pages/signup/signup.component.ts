import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordMatch } from '../../../shared/models/passwordconfirmation';
import { Router } from '@angular/router';
import { user } from 'src/app/shared/models/userModel';
import { UsersService } from 'src/app/shared/services/pageServices/usersService/users.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
  playlistIcons = [
    'fa-music',
    'fa-icons',
    'fa-headphones',
    'fa-play',
    'fa-record-vinyl',
    'fa-radio',
    'fa-volume-off',
    'fa-guitar',
    'fa-compact-disc',
    'fa-circle-play',
    'fa-sliders',
  ];
  constructor(
    private firestorage: AngularFireStorage,
    private usersServ: UsersService,
    private router: Router,
    private fireAuth: AngularFireAuth
  ) {
    this.firestorage
      .ref('userDefImg/userDefaultImg.png')
      .getDownloadURL()
      .subscribe((url) => {
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

  randomPlaylistIconGenerator() {
    let randomIcons = Math.floor(Math.random() * 11);
    return randomIcons;
  }

  signUp() {
    const email = this.userForm.value.email as string,
      password = this.userForm.value.password as string;
    this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // User created successfully, now add user details to Firestore
        const user = userCredential.user;
        let randomIconIndex = this.randomPlaylistIconGenerator();
        this.usersServ
          .addUser({
            name: this.userForm.value.name as string,
            email: email,
            password: password,
            img: this.userDefaultImg,
            playlists: {
              liked: {
                playlistName: 'liked',
                playlistIcon: this.playlistIcons[randomIconIndex],
                playlistSongs: [],
              },
            },
          })
          .then(() => {
            this.router.navigate(['/login']);
          });
      })
      .catch((error) => {
        console.error(
          'Error creating user in Firebase Authentication: ',
          error
        );
      });
  }
}
