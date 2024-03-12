import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { PlaylistsService } from 'src/app/shared/services/pageServices/playlists/playlists.service';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css'],
})
export class AddPlaylistComponent {
  @Output() isPopupCancelled = new EventEmitter<boolean>();
  @Input() musicId: string = '';
  userId: string = '';
  playlists: any[] = [];
  playlistIcons = [
    'fa-music',
    'fa-icons',
    'fa-headphones',
    'fa-play',
    'fa-record-vinyl',
    'fa-radio',
    'fa-volume-off',
    'fa-guitar',
    'fa-compact-disc',
    'fa-circle-play',
    'fa-sliders',
  ];
  selectedPlaylistsArr: string[] = [];
  constructor(
    private playlistsServ: PlaylistsService,
    private localStg: LocalstoragesService
  ) {
    this.localStg.isUserdata$.subscribe((userData) => {
      this.userId = userData.id;

      this.playlists = userData.playlists;
      this.playlists = Object.values(userData.playlists);
    });
  }
  ngOnInit() {
    console.log(this.musicId);
  }

  playlistPopUpCancelClick() {
    this.isPopupCancelled.emit(true);
  }

  playlistPopUpDoneClick() {
    this.playlistsServ
      .addMusicInPlaylists(this.userId, this.selectedPlaylistsArr, this.musicId)
      .subscribe((sub) => {
        console.log('works');
      });
  }

  randomPlaylistIconGenerator() {
    let randomIcons = Math.floor(Math.random() * 11);
    return randomIcons;
  }

  addNewPlaylictClick(input: string) {
    console.log(input);
    const randomIconNumber = this.randomPlaylistIconGenerator();
    this.playlistsServ
      .createPlaylist(this.userId, input, this.playlistIcons[randomIconNumber])
      .subscribe((sub) => {
        let userDataFromLS = JSON.parse(
          localStorage.getItem('userInfo') || 'null'
        );
        userDataFromLS = {
          ...userDataFromLS,
          playlists: {
            ...userDataFromLS.playlists,
            [input]: {
              playlistIcon: this.playlistIcons[randomIconNumber],
              playlistName: input,
              playlistSongs: [],
            },
          },
        };
        localStorage.setItem('userInfo', JSON.stringify(userDataFromLS));
        this.localStg.userData.next(userDataFromLS);
      });
  }

  selectedPlaylists(value: any, playlistName: string) {
    if (value.checked) {
      console.log(playlistName);
      if (!this.selectedPlaylistsArr.includes(playlistName)) {
        this.selectedPlaylistsArr.push(playlistName);
        console.log('ADDED:', this.selectedPlaylistsArr);
      }
    } else {
      this.selectedPlaylistsArr = this.selectedPlaylistsArr.filter(
        (name) => name !== playlistName
      );
      console.log('REMOVED:', this.selectedPlaylistsArr);
    }
  }
}
