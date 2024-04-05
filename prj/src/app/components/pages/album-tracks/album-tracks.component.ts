import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstoragesService } from 'src/app/shared/services/localstorages/localstorages.service';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-album-tracks',
  templateUrl: './album-tracks.component.html',
  styleUrls: ['./album-tracks.component.css'],
})
export class AlbumTracksComponent implements OnInit {
  album: any = {};
  albumMusics: any = {};
  musicIds: string[] = [];
  isLoading: boolean = false;
  albumImg: string = '';
  savedClickedMusicId: string = '';
  constructor(
    private localStg: LocalstoragesService,
    private artistData: ArtistDataService
  ) {
    this.isLoading = true;
    this.artistData.getAlbum$.subscribe((albumdata) => {
      this.album = albumdata;
      this.albumImg = albumdata.img;
      // console.log(this.album);
    });

    this.artistData
      .getArtistAlbumsTracks(this.album.id)
      .subscribe((musicsData) => {
        this.albumMusics = musicsData.items;

        if (Array.isArray(this.albumMusics)) {
          this.albumMusics.forEach((elem) => {
            this.musicIds.push(elem.id);
          });
        }
        this.isLoading = false;
      });
  }

  ngOnInit() {
    this.localStg.selectedMusic$.subscribe((music) => {
      if (music) {
        this.savedClickedMusicId = music.musicId;
      }
    });
  }
}
