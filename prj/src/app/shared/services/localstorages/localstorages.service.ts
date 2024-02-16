import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LocalstoragesService {
  isLoggedSubject = new BehaviorSubject<boolean>(this.getSign());
  islogged$: Observable<boolean> = this.isLoggedSubject.asObservable();
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
}
