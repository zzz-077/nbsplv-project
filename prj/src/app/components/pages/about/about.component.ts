import { Component } from '@angular/core';
import { ArtistDataService } from 'src/app/shared/services/pageServices/artistsService/artist-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent {
  artist = {
    img: '',
    followers: 0,
  };

  constructor(private artistData: ArtistDataService) {
    this.artistData.getArtistInfo().subscribe((artistInfo) => {
      this.artist = {
        img: artistInfo.images[1].url,
        followers: artistInfo.followers.total,
      };
    });
  }
}
