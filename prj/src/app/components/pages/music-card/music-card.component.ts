import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SelectedMusic } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css'],
})
export class MusicCardComponent implements OnInit {
  @Input() AlbumMusics: any = {};
  @Input() allMusicId: string[] = [];
  @Input() UsersListMusicID: string = '';
  @Input() index: number = 0;
  @Input() albumImg_child: string = '';
  @Input() isActive: boolean = false;
  addPlaylistMusicId: string = '';
  isAddinPlaylistClicked: boolean = false;
  // isActive: boolean = false;
  isLoader: boolean = false;
  isUserLogged:boolean = false;
  constructor(
    private localStg: LocalstoragesService,
    private artistData: ArtistDataService
  ) {
    this.localStg.islogged$.subscribe(boolean =>{
      this.isUserLogged=boolean;
    })
  }

  // for User playlists
  ngOnInit() {
    this.isLoader = true;
    if (this.UsersListMusicID) {
      this.artistData.getMusic(this.UsersListMusicID).subscribe((musicData) => {
        this.AlbumMusics = musicData;
        this.albumImg_child = this.AlbumMusics.album.images[1].url;
        this.isLoader = false;
      });
    } else {
      this.isLoader = false;
    }
  }

  musicClick(music: any) {
    // const ClickedMusic = this.localStg.getSelectedMusic();
    // console.log('musicIdfromclick:' + music.id);
    // console.log('musicIdfromlocalstg:' + ClickedMusic.musicId);
    // if (ClickedMusic.musicId !== music.id) {
    //   console.log(music.id);
    //   this.isActive = true;
    // } else {
    //   this.isActive = false;
    // }

    let selectedMusic: SelectedMusic = {
      index: 0,
      musicId: '',
      albumMusicIds: [],
    };
    if (this.UsersListMusicID) {
      selectedMusic = {
        index: this.index - 1,
        musicId: music.id,
        albumMusicIds: this.allMusicId,
      };
    } else {
      selectedMusic = {
        index: this.index - 1,
        musicId: music.id,
        albumMusicIds: this.allMusicId,
      };
    }
    this.localStg.setSelectedMusic(selectedMusic);
  }

  addInPlaylist(musicId: string) {
    this.addPlaylistMusicId = musicId;
    this.isAddinPlaylistClicked = true;
  }

  PopupCancelled() {
    this.isAddinPlaylistClicked = false;
  }
}
