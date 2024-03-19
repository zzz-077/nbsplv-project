import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectedMusic, user } from '../../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class LocalstoragesService {
  isLoggedSubject = new BehaviorSubject<boolean>(this.getSign());
  islogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  userData = new BehaviorSubject<any>(this.getUserData());
  isUserdata$: Observable<any> = this.userData.asObservable();

  music = new BehaviorSubject<SelectedMusic>(this.getSelectedMusic());
  selectedMusic$: Observable<SelectedMusic> = this.music.asObservable();

  constructor() {}

  /*=================================*/
  /*=========LANGUAGE CHANGE=========*/
  /*=================================*/
  setLang(lang: string) {
    localStorage.setItem('lang', lang);
  }

  getLang() {
    return localStorage.getItem('lang');
  }
  /*===========================*/
  /*=========SIGN USER=========*/
  /*===========================*/
  setSign(user: boolean) {
    localStorage.setItem('user', JSON.stringify(user));
    this.isLoggedSubject.next(user);
  }

  getSign() {
    return JSON.parse(localStorage.getItem('user') || 'false');
  }

  setUserData(user: any) {
    if (user.name?.split(' ')) {
      user.name = user.name?.split(' ')[0];
    } else if (user.name?.split('-')) {
      user.name = user.name?.split('-')[0];
    } else if (user.name?.split('_')) {
      user.name = user.name?.split('_')[0];
    } else if (user.name?.split('/')) {
      user.name = user.name?.split('/')[0];
    } else if (user.name?.split('.')) {
      user.name = user.name?.split('.')[0];
    } else {
      user.name = user.name;
    }

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        img: user.img,
        playlists: user.playlists,
      })
    );

    this.userData.next({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      img: user.img,
      playlists: user.playlists,
    });
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userInfo') || 'null');
  }

  setSelectedMusic(music: SelectedMusic) {
    localStorage.setItem('selectedMusic', JSON.stringify(music));

    this.music.next(music);
  }

  getSelectedMusic() {
    return JSON.parse(localStorage.getItem('selectedMusic') || 'null');
  }
}
