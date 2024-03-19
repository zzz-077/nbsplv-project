import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { SelectedMusic } from 'src/app/shared/models/userModel';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.css'],
})
export class MusicCardComponent {
  @Input() AlbumMusics: any = {};
  @Input() UsersListMusicID: string = '';
  @Input() index: number = 0;
  @Input() albumImg_child: string = '';
  addPlaylistMusicId: string = '';

  constructor(
    private localStg: LocalstoragesService,
    private artistData: ArtistDataService
  ) {}

  isAddinPlaylistClicked = false;
  // for User playlists
  ngOnInit() {
    if (this.UsersListMusicID) {
      this.artistData.getMusic(this.UsersListMusicID).subscribe((musicData) => {
        this.AlbumMusics = musicData;
        this.albumImg_child = this.AlbumMusics.album.images[1].url;
      });
    }
  }

  musicClick(music: any) {
    let selectedMusic: SelectedMusic = {
      albumImg: '',
      musicName: '',
      duration: 0,
      musicUrl: '',
    };
    if (this.UsersListMusicID) {
      selectedMusic = {
        albumImg: music.album.images[2].url,
        musicName: music.name,
        duration: music.duration_ms as number,
        musicUrl: music.preview_url,
      };
    } else {
      selectedMusic = {
        albumImg: this.albumImg_child,
        musicName: music.name,
        duration: music.duration_ms as number,
        musicUrl: music.preview_url,
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
