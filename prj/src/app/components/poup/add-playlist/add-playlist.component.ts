import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { randomIcons } from 'src/app/shared/models/RandomIcons';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { PlaylistsService } from 'src/app/shared/services/pageServices/playlists/playlists.service';
import { UsersService } from 'src/app/shared/services/pageServices/usersService/users.service';

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
  isLoader: boolean = false;
  isCheckBoxClicked: boolean = false;
  isInputEmpty: boolean = false;
  selectedPlaylistsArr: string[] = [];

  constructor(
    private playlistsServ: PlaylistsService,
    private localStg: LocalstoragesService,
    private randicons: randomIcons,
    private usersServ: UsersService
  ) {
    this.localStg.isUserdata$.subscribe((userData) => {
      this.userId = userData.id;

      this.playlists = userData.playlists;
      this.playlists = Object.values(userData.playlists);
    });
  }

  playlistPopUpCancelClick() {
    this.isPopupCancelled.emit(true);
  }

  playlistPopUpDoneClick() {
    this.isLoader = true;
    this.isCheckBoxClicked = false;
    this.playlistsServ
      .addMusicInPlaylists(this.userId, this.selectedPlaylistsArr, this.musicId)
      .subscribe((sub) => {
        this.selectedPlaylistsArr = [];
        this.isPopupCancelled.emit(true);
        this.usersServ.getUser(this.userId).subscribe((userData) => {
          let userDataFromLS = JSON.parse(
            localStorage.getItem('userInfo') || 'null'
          );
          (userDataFromLS = {
            ...userDataFromLS,
            playlists: userData?.playlists,
          }),
            (this.isLoader = false);
          localStorage.setItem('userInfo', JSON.stringify(userDataFromLS));
          this.localStg.userData.next(userDataFromLS);
        });
      });
  }

  addNewPlaylictClick(input: string) {
    const randomIconNumber = this.randicons.randomPlaylistIconGenerator();

    this.playlistsServ
      .createPlaylist(
        this.userId,
        input,
        this.randicons.playlistIcons[randomIconNumber]
      )
      .subscribe((sub) => {
        let userDataFromLS = JSON.parse(
          localStorage.getItem('userInfo') || 'null'
        );
        userDataFromLS = {
          ...userDataFromLS,
          playlists: {
            ...userDataFromLS.playlists,
            [input]: {
              playlistIcon: this.randicons.playlistIcons[randomIconNumber],
              playlistName: input,
              playlistSongs: [],
            },
          },
        };
        localStorage.setItem('userInfo', JSON.stringify(userDataFromLS));
        this.localStg.userData.next(userDataFromLS);
        this.isPopupCancelled.emit(true);
      });
  }

  checkInput(input: string) {
    if (input.trim() !== '') {
      this.isInputEmpty = true;
    } else {
      this.isInputEmpty = false;
    }
  }

  selectedPlaylists(value: any, playlistName: string) {
    if (value.checked) {
      this.isCheckBoxClicked = true;
      if (!this.selectedPlaylistsArr.includes(playlistName)) {
        this.selectedPlaylistsArr.push(playlistName);
        // console.log('ADDED:', this.selectedPlaylistsArr);
      }
    } else {
      this.selectedPlaylistsArr = this.selectedPlaylistsArr.filter(
        (name) => name !== playlistName
      );
      // console.log('REMOVED:', this.selectedPlaylistsArr);
    }
    if (this.selectedPlaylistsArr.length == 0) {
      this.isCheckBoxClicked = false;
    }
  }
}
