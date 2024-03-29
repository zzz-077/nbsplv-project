import { Component, OnInit } from '@angular/core';
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
  followersValue: number = 0;
  isLoading: boolean = false;

  constructor(private artistData: ArtistDataService) {
    this.isLoading = true;
    this.artistData.getArtistInfo().subscribe((artistInfo) => {
      this.artist = {
        img: artistInfo.images[1].url,
        followers: artistInfo.followers.total,
      };
      this.isLoading = false;
    });
  }
  ngOnInit() {
    let startValue = 0;
    let endvalue = 172901;
    let interval = 50;
    let duration = Math.floor(interval / endvalue);
    let counter = setInterval(() => {
      startValue += 550;
      this.followersValue = startValue;
      if (startValue >= endvalue) {
        this.followersValue = endvalue;
        clearInterval(counter);
      }
    }, duration);
  }
}
