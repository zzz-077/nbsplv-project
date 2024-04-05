import { Component, OnInit } from '@angular/core';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { PlaylistsService } from 'src/app/shared/services/pageServices/playlists/playlists.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  UserData = {
    id: '',
    name: '',
    img: 'assets/userDefault_img.png',
  };
  playlists: any[] = [];
  chosenPlaylistName: string = '';
  chosenPlaylistSongs: any[] = [];
  ifAlbumisClicked: boolean = false;
  isLoading: boolean = false;
  isPlaylistsDeleteClicked: boolean = false;
  musicIds: string[] = [];
  chosenPlaylist: any = null;
  savedClickedMusicId: string = '';
  constructor(
    private localStg: LocalstoragesService,
    private playlistsServ: PlaylistsService
  ) {
    this.localStg.isUserdata$.subscribe((userData) => {
      if (userData) {
        this.UserData = {
          id: userData.id,
          name: userData.name,
          img: userData.img,
        };
      }
      this.playlists = userData.playlists;
      this.playlists = Object.values(userData.playlists);
    });
  }

  ngOnInit() {
    this.localStg.selectedMusic$.subscribe((music) => {
      if (music) {
        this.savedClickedMusicId = music.musicId;
      }
    });
  }

  userPlaylistClick(playlist: any) {
    let playlistMusics = playlist.playlistSongs;
    if (Array.isArray(playlistMusics)) {
      playlistMusics.forEach((elem) => {
        this.musicIds.push(elem);
      });
    }
  }

  playlistClick(playlist: any) {
    this.chosenPlaylist = playlist;

    this.isLoading = true;
    this.ifAlbumisClicked = true;
    this.chosenPlaylistName = playlist.playlistName;
    const chosenPlaylist = this.playlists.find((obj) => {
      return obj.playlistName === playlist.playlistName;
    });
    if (chosenPlaylist) {
      this.chosenPlaylistSongs = chosenPlaylist.playlistSongs;
    } else {
      this.chosenPlaylistSongs = [];
    }

    this.isLoading = false;
  }
  deletePlaylistsClick(playlistName: string) {
    this.isPlaylistsDeleteClicked = true;
  }
  canceledDeletingfromPopup() {
    this.isPlaylistsDeleteClicked = false;
  }
}
