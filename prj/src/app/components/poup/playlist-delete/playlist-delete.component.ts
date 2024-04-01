import { Component, EventEmitter, Output, Input } from '@angular/core';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { PlaylistsService } from 'src/app/shared/services/pageServices/playlists/playlists.service';

@Component({
  selector: 'app-playlist-delete',
  templateUrl: './playlist-delete.component.html',
  styleUrls: ['./playlist-delete.component.css'],
})
export class PlaylistDeleteComponent {
  @Output() isDeletingcanceled = new EventEmitter<boolean>();
  @Input() playlistname: string = '';
  @Input() userId: string = '';
  isLoader: boolean = false;
  constructor(
    private localStg: LocalstoragesService,
    private playlistsServ: PlaylistsService
  ) {}

  cancelDeleting() {
    this.isDeletingcanceled.emit(true);
  }

  DeletePlaylist() {
    this.isLoader = true;
    this.playlistsServ
      .deleteUserPlaylist(this.userId, this.playlistname)
      .subscribe((userData) => {
        let userDataFromLS = JSON.parse(
          localStorage.getItem('userInfo') || 'null'
        );
        userDataFromLS = {
          ...userDataFromLS,
          playlists: {
            ...userData.playlists,
          },
        };
        this.isLoader = false;
        localStorage.setItem('userInfo', JSON.stringify(userDataFromLS));
        this.localStg.userData.next(userDataFromLS);
        this.isDeletingcanceled.emit(true);
      });
  }
}
