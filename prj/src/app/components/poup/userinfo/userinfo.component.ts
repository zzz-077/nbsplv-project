import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent {
  @Output() closeInfopopUp = new EventEmitter<boolean>();

  isEditClicked = false;
  showPass = false;

  editClick(event: Event) {
    event.preventDefault();
    this.isEditClicked = true;
    console.log(this.isEditClicked);
  }
  saveClick(event: Event) {
    event.preventDefault();
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
}
