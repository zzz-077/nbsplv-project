import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { user } from '../../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class LocalstoragesService {
  isLoggedSubject = new BehaviorSubject<boolean>(this.getSign());
  islogged$: Observable<boolean> = this.isLoggedSubject.asObservable();

  userData = new BehaviorSubject<any>(this.getUserData());
  isUserdata$: Observable<any> = this.userData.asObservable();
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
    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        id: user.documentId,
        name: user.user.name,
        email: user.user.email,
        password: user.user.password,
        img: user.user.img,
      })
    );
    this.userData.next({
      id: user.documentId,
      name: user.user.name,
      email: user.user.email,
      password: user.user.password,
      img: user.user.img,
    });
  }
  getUserData() {
    return JSON.parse(localStorage.getItem('userInfo') || 'null');
  }
}
