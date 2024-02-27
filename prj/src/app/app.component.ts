import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { LocalstoragesService } from './shared/services/localstorages/localstorages.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersService } from './shared/services/pageServices/pageServices/users.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'prj';
  /*================================*/
  /*================================*/
  /*============VARIABLES===========*/
  /*================================*/
  /*================================*/
  tracking: boolean = false;
  startWidth: number | null = null;
  startCursorScreenX: number | null = null;
  handleWidth: number = 10;
  resizeTarget: HTMLElement | null = null;
  parentElement: HTMLElement | null = null;
  maxWidth: number | null = null;
  isSidebarfolded = false;
  isSidebarfoldedForLogo = false;
  isSidebarfoldedForLang = false;
  isLanguageSelectorClicked = false;
  DefaultLangSelectorName = this.localStg.getLang();
  DefaultLangSelectorFullName = '';
  isUserInfoclicked = false;
  isUserLogged = false;
  UserData = {
    id: '',
    name: '',
    email: '',
    password: '',
    img: '',
  };
  constructor(
    private usersServ: UsersService,
    private router: Router,
    private localStg: LocalstoragesService
  ) {
    if (localStg.getLang() === 'Eng') {
      this.DefaultLangSelectorName = this.localStg.getLang();
      this.DefaultLangSelectorFullName = 'English';
    } else {
      this.DefaultLangSelectorName = this.localStg.getLang();
      this.DefaultLangSelectorFullName = 'Georgian';
    }
    this.localStg.islogged$.subscribe((isLogged) => {
      this.isUserLogged = isLogged;
    });
    this.localStg.isUserdata$.subscribe((data) => {
      if (data) {
        this.UserData = {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          img: data.img,
        };
        console.log(this.UserData);
      }
    });
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
    this.router.navigate(['']);
  }

  /*======================================*/
  /*======================================*/
  /*============POPUP FUNCTIONS===========*/
  /*======================================*/
  /*======================================*/
  userClick() {
    this.isUserInfoclicked = true;
  }
  closePopup(event: any) {
    this.isUserInfoclicked = event;
  }

  selectTarget(fromElement: HTMLElement, selector: string): HTMLElement | null {
    return fromElement.querySelector(selector);
  }
  /*=======================================*/
  /*=======================================*/
  /*============RESIZABLE NAVBAR===========*/
  /*=======================================*/
  /*=======================================*/

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.button !== 0) {
      return;
    }

    const handleElement = event.target as HTMLElement;

    if (!handleElement.parentElement) {
      console.error(new Error('Parent element not found.'));
      return;
    }

    const targetSelector = handleElement.getAttribute('data-target') as string;
    const targetElement = this.selectTarget(
      handleElement.parentElement,
      targetSelector
    );

    if (!targetElement) {
      return;
    }

    this.startWidth = targetElement.offsetWidth;
    this.startCursorScreenX = event.screenX;
    this.resizeTarget = targetElement;
    this.parentElement = handleElement.parentElement;
    this.maxWidth = handleElement.parentElement.offsetWidth - this.handleWidth;
    this.tracking = true;

    console.log('tracking started');
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.tracking) {
      const cursorScreenXDelta = event.screenX - (this.startCursorScreenX || 0);
      let newWidth = (this.startWidth || 0) + cursorScreenXDelta;

      newWidth = Math.max(newWidth, 100);

      newWidth = Math.min(newWidth, 350);

      if (this.resizeTarget) {
        this.resizeTarget.style.width = newWidth + 'px';
      }

      if (newWidth > 180) {
        this.isSidebarfoldedForLogo = true;
      } else {
        this.isSidebarfoldedForLogo = false;
      }
      if (newWidth > 120) {
        this.isSidebarfolded = true;
      } else {
        this.isSidebarfolded = false;
      }
      if (newWidth > 200) {
        this.isSidebarfoldedForLang = true;
      } else {
        this.isSidebarfoldedForLang = false;
      }
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.tracking) {
      this.tracking = false;
    }
  }
  /*========================================*/
  /*========================================*/
  /*============LANGUAGE SELECTOR===========*/
  /*========================================*/
  /*========================================*/

  langSelectorClick() {
    this.isLanguageSelectorClicked = !this.isLanguageSelectorClicked;
  }

  languageSelectedClick(lang: string) {
    this.localStg.setLang(lang);
    if (lang == 'Eng') {
      this.DefaultLangSelectorFullName = 'English';
    } else {
      this.DefaultLangSelectorFullName = 'Georgian';
    }
    this.DefaultLangSelectorName = this.localStg.getLang();
    this.isLanguageSelectorClicked = false;
  }
}
