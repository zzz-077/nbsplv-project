import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class LocalstoragesService {
  constructor() {}

  setLang(lang: string) {
    localStorage.setItem('lang', lang);
  }
  getLang() {
    return localStorage.getItem('lang');
  }
}
