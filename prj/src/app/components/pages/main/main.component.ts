import { Component } from '@angular/core';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  albums: any[] = [];

  constructor(private artistData: ArtistDataService) {
    this.artistData.getArtistAlbums().subscribe((albums) => {
      if (Array.isArray(albums)) {
        albums.forEach((album: any) => {
          this.albums.push({
            id: album.id,
            name: album.name,
            release_date: album.release_date,
            total_tracks: album.total_tracks,
            img: album.images[1].url,
          });
        });
      }
    });
  }
}
