import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css'],
})
export class AlbumTracksComponent {
  album: any = {};
  albumMusics: any = {};
  isDataRecieved = false;
  albumImg: string = '';
  constructor(private artistData: ArtistDataService) {
    this.artistData.getAlbum$.subscribe((albumdata) => {
      this.album = albumdata;
      this.albumImg = albumdata.img;
      // console.log(this.album.id);
    });
    this.artistData
      .getArtistAlbumsTracks(this.album.id)
      .subscribe((musicsData) => {
        this.albumMusics = musicsData.items;
        this.isDataRecieved = true;
        // console.log(this.albumMusics);
      });
  }
}
