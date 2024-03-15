import { Component, Input, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
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
  constructor(private artistData: ArtistDataService) {}

  isAddinPlaylistClicked = false;
  ngOnInit() {
    if (this.UsersListMusicID) {
      this.artistData.getMusic(this.UsersListMusicID).subscribe((musicData) => {
        this.AlbumMusics = musicData;
        this.albumImg_child = this.AlbumMusics.album.images[1].url;
      });
    }
  }

  addInPlaylist(musicId: string) {
    this.addPlaylistMusicId = musicId;
    this.isAddinPlaylistClicked = true;
  }

  PopupCancelled() {
    this.isAddinPlaylistClicked = false;
  }
}
