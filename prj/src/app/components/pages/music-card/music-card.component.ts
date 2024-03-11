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
  @Input() index: number = 0;
  @Input() albumImg_child: string = '';
  constructor(private artistData: ArtistDataService) {}
  isAddinPlaylistClicked = false;
  ngOnInit() {}

  addInPlaylist() {
    this.isAddinPlaylistClicked = true;
  }

  PopupCancelled() {
    this.isAddinPlaylistClicked = false;
  }
}
