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
export class AddPlaylistComponent implements OnInit {
  @Output() isPopupCancelled = new EventEmitter<boolean>();
  @Input() musicId: string = '';
  userId: string = '';
  playlists: any[] = [];
  isLoader: boolean = false;
  isCheckBoxClicked: boolean = false;
  isInputEmpty: boolean = false;
  selectedPlaylistsArr: string[] = [];
  alreadyInPlaylist: any[] = [];
  deleteFromPlaylist: any[] = [];

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

  ngOnInit() {
    this.playlistsServ
      .checkMusicUserPlaylist(this.userId, this.musicId)
      .subscribe((playlists) => {
        if (Array.isArray(playlists) && playlists.length > 0) {
          this.alreadyInPlaylist = playlists;
          // console.log(this.alreadyInPlaylist);
        } else {
          // console.log('doesnot in array');
        }
      });
  }

  playlistPopUpCancelClick() {
    this.isPopupCancelled.emit(true);
  }

  playlistPopUpDoneClick() {
    if (this.deleteFromPlaylist.length != 0) {
      this.playlistsServ;
    }
    if (this.selectedPlaylistsArr.length != 0) {
      this.isLoader = true;
      this.isCheckBoxClicked = false;
      this.playlistsServ
        .addMusicInPlaylists(
          this.userId,
          this.selectedPlaylistsArr,
          this.musicId
        )
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
    this.isCheckBoxClicked = false;
    if (
      this.alreadyInPlaylist.length != 0 &&
      this.alreadyInPlaylist.includes(playlistName)
    ) {
      this.isCheckBoxClicked = true;
      if (!value.checked) {
        this.deleteFromPlaylist.push(playlistName);
        // console.log(this.deleteFromPlaylist);
      } else {
        this.deleteFromPlaylist = this.deleteFromPlaylist.filter((item) => {
          return item !== playlistName;
        });
        // console.log('Unchecked:', this.deleteFromPlaylist);
      }
    } else {
      // console.log('new playlist');
      this.isCheckBoxClicked = true;
      if (value.checked) {
        if (!this.selectedPlaylistsArr.includes(playlistName)) {
          this.selectedPlaylistsArr.push(playlistName);
        }
      } else {
        this.selectedPlaylistsArr = this.selectedPlaylistsArr.filter(
          (name) => name !== playlistName
        );
      }
      if (
        this.selectedPlaylistsArr.length == 0 &&
        this.alreadyInPlaylist.length == 0
      ) {
        this.isCheckBoxClicked = false;
      } else if (
        this.selectedPlaylistsArr.length == 0 &&
        this.alreadyInPlaylist.length != 0 &&
        !value.checked
      ) {
        this.isCheckBoxClicked = false;
      } else if (this.alreadyInPlaylist.length != 0) {
        this.isCheckBoxClicked = true;
      } else if (this.selectedPlaylistsArr.length == 0) {
        this.isCheckBoxClicked = false;
      }
    }
    if (
      this.deleteFromPlaylist.length == 0 &&
      this.selectedPlaylistsArr.length > 0
    ) {
      this.isCheckBoxClicked = true;
    } else if (this.deleteFromPlaylist.length == 0) {
      this.isCheckBoxClicked = false;
    }
  }
}
