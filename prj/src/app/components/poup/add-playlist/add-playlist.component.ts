import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css'],
})
export class AddPlaylistComponent {
  @Output() isPopupCancelled = new EventEmitter<boolean>();
  constructor() {}

  playlistPopUpCancelClick() {
    this.isPopupCancelled.emit(true);
  }
  playlistPopUpDoneClick() {}
}
