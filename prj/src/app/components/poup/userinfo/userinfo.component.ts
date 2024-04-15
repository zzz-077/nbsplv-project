import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { UsersService } from 'src/app/shared/services/pageServices/usersService/users.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent {
  /*================================*/
  /*================================*/
  /*============VARIABLES===========*/
  /*================================*/
  /*================================*/
  @Output() closeInfopopUp = new EventEmitter<boolean>();
  userInfo = {
    id: '',
    name: '',
    email: '',
    password: '',
    img: '',
    playlists: {},
  };
  isEditClicked = false;
  showPass = false;
  isLoader: boolean = false;
  isUserLogged = false;
  constructor(
    private firestorage: AngularFireStorage,
    private usersServ: UsersService,
    private router: Router,
    private localStg: LocalstoragesService
  ) {
    this.localStg.isUserdata$.subscribe((data) => {
      if (data) {
        this.userInfo = {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          img: data.img,
          playlists: data.playlists,
        };
      }
      this.isUserLogged = this.localStg.getSign();
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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^[a-zA-Z0-7]+$/),
    ]),
  });
  /*==============================*/
  /*==============================*/
  /*===========FUNCTIONS==========*/
  /*==============================*/
  /*==============================*/

  editClick(event: Event) {
    this.showPass = false;
    event.preventDefault();
    this.isEditClicked = true;
  }

  saveClick(event: Event) {
    this.isLoader = true;
    this.usersServ.updateUser(
      this.userInfo.id,
      this.userForm.value.name as string,
      this.userForm.value.password as string
    );
    // if (this.localStg.userData) {
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        ...this.userInfo,
        name: this.userForm.value.name as string,
        password: this.userForm.value.password as string,
      })
    );
    this.localStg.userData.next({
      ...this.userInfo,
      name: this.userForm.value.name as string,
      password: this.userForm.value.password as string,
    });
    // }

    event.preventDefault();
    this.isLoader = false;
    this.isEditClicked = false;
  }

  cancelClick(event: Event) {
    event.preventDefault();
    this.isEditClicked = false;
  }

  exitClick(event: Event) {
    this.closeInfopopUp.emit(false);
    event.preventDefault();
  }

  showPassword(value: string) {
    if (value === 'show') {
      this.showPass = true;
    } else {
      this.showPass = false;
    }
  }

  async useImgChange(file: any) {
    this.isLoader = true;
    const img = file.target.files[0];
    if (img) {
      const path = `userImgBase/${img.name}`;
      const uploadImg = await this.firestorage.upload(path, img);
      const getUrl = await uploadImg.ref.getDownloadURL();
      if (this.userInfo.img) {
        try {
          const imageName = this.usersServ.getImageNameFromUrl(
            this.userInfo.img
          );
          await this.usersServ.deleteUserImgFromStorage(imageName);
        } catch (error) {
          console.error('Error deleting old image:', error);
        } finally {
          this.isLoader = false;
        }
      }
      this.isLoader = true;
      this.usersServ.updateUserImg(this.userInfo.id, getUrl).finally(() => {
        this.isLoader = false;
      });
      if (this.localStg.userData) {
        localStorage.setItem(
          'userInfo',
          JSON.stringify({
            ...this.userInfo,
            img: getUrl,
          })
        );
        this.localStg.userData.next({
          ...this.userInfo,
          img: getUrl,
        });
      } else {
        console.log('ERROR');
      }
    }
  }

  logOutClick() {
    this.localStg.setSign(false);
    this.isUserLogged = this.localStg.getSign();
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: '',
        name: '',
        email: '',
        password: '',
        img: '',
      })
    );
    this.localStg.setSelectedMusic({
      albumMusicIds: [],
      index: 0,
      musicId: '',
    });
    this.router.navigate(['']);
  }
}
