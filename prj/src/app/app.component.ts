import { Component, ElementRef, HostListener } from '@angular/core';
import { LocalstoragesService } from './shared/services/localstorages/localstorages.service';
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
  DefaultLangSelectorFlag = 'langEng.png';
  DefaultLangSelectorName = this.localStg.getLang();
  DefaultLangSelectorFullName = '';
  isUserInfoclicked = false;
  /*======================================*/
  /*======================================*/
  /*============POPUP FUNCTIONS===========*/
  /*======================================*/
  /*======================================*/
  userClick() {
    this.isUserInfoclicked = true;
    console.log(this.isUserInfoclicked);
  }
  closePopup(event: any) {
    console.log('fromchild: ' + event);
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
  constructor(
    private elementRef: ElementRef,
    private localStg: LocalstoragesService
  ) {
    if (localStg.getLang() === 'eng') {
      this.DefaultLangSelectorFlag = 'langEng.png';
      this.DefaultLangSelectorName = this.localStg.getLang();
      this.DefaultLangSelectorFullName = 'English';
    } else {
      this.DefaultLangSelectorFlag = 'langGeo.png';
      this.DefaultLangSelectorName = this.localStg.getLang();
      this.DefaultLangSelectorFullName = 'Georgian';
    }
  }

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
      console.log('tracking stopped');
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
    if (lang == 'eng') {
      this.DefaultLangSelectorFlag = 'langEng.png';
      this.DefaultLangSelectorFullName = 'English';
    } else {
      this.DefaultLangSelectorFlag = 'langGeo.png';
      this.DefaultLangSelectorFullName = 'Georgian';
    }
    this.DefaultLangSelectorName = this.localStg.getLang();
    this.isLanguageSelectorClicked = false;
  }
}
